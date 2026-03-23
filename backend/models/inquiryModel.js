import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Resolved", "Closed"],
    default: "Open",
  },
  response: { type: String },
  date: { type: Date, default: Date.now },
});

const inquiryModel =
  mongoose.models.inquiry || mongoose.model("inquiry", inquirySchema);

export default inquiryModel;
