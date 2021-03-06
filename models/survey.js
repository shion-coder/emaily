const mongoose = require("mongoose");

const recipientSchema = require("./recipient");

/* -------------------------------------------------------------------------- */

const { Schema } = mongoose;

const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [recipientSchema],
  totalEmails: { type: Number, default: 0 },
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date,
});

mongoose.model("surveys", surveySchema);
