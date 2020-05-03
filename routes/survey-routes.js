const mongoose = require("mongoose");
const sgMail = require("@sendgrid/mail");

const requireLogin = require("../middlewares/require-login");
const requireCredits = require("../middlewares/require-credits");

const { sendGridKey, redirectDomain } = require("../config/keys");

/* -------------------------------------------------------------------------- */

sgMail.setApiKey(sendGridKey);

const Survey = mongoose.model("surveys");

module.exports = (app) => {
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thanks for voting!");
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    const msg = {
      to: recipients.split(","),
      from: "shionluo@gmail.com",
      subject: subject,
      html: `
        <html>
          <body>
            <div style="text-align: center;">
              <h3>I'd like your input!</h3>
              <p>Please answer the following question:</p>
              <p>${body}</p>
              <div>
                <a href="${redirectDomain}/api/surveys/thanks">Yes</a>
              </div>
              <div>
                <a href="${redirectDomain}/api/surveys/thanks">No</a>
              </div>
            </div>
          </body>
        <html/>
      `,
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
