const mongoose = require("mongoose");
const sgMail = require("@sendgrid/mail");
const { URL } = require("url");
const { Path } = require("path-parser");
const _ = require("lodash");

const requireLogin = require("../middlewares/require-login");
const requireCredits = require("../middlewares/require-credits");

const { sendGridKey } = require("../config/keys");

const surveyTemplate = require("../services/email-templates/survey-template");

/* -------------------------------------------------------------------------- */

sgMail.setApiKey(sendGridKey);

const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const path = new Path("/api/surveys/:surveyId/:choice");

    _.chain(req.body)
      .map(({ url, email }) => {
        const match = path.test(new URL(url).pathname);

        if (match) {
          const { surveyId, choice } = match;

          return { email, surveyId, choice };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ email, surveyId, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });

    res.send(surveys);
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const totalEmails = recipients.split(",").length;

    const survey = new Survey({
      title,
      subject,
      body,
      totalEmails,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    const msg = {
      to: recipients.split(",").map((email) => email.trim()),
      from: "shionluo@gmail.com",
      subject: subject,
      html: surveyTemplate(survey),
    };

    try {
      await sgMail.send(msg);
      await survey.save();

      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (error) {
      res.status(422).send(error);
    }
  });
};
