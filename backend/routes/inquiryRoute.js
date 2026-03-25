import express from "express";
import inquiryModel from "../models/inquiryModel.js";
import authUser from "../middleware/auth.js";
import roleAuth from "../middleware/roleAuth.js";
import adminAuth from "../middleware/adminAuth.js";

const inquiryRouter = express.Router();

// Submit an inquiry (Customer only)
inquiryRouter.post("/submit", authUser, roleAuth(["customer"]), async (req, res) => {
  try {
    const { subject, message } = req.body;
    const userId = req.user._id;

    const inquiry = new inquiryModel({ userId, subject, message });
    await inquiry.save();

    res.json({ success: true, message: "Inquiry submitted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

// Get user inquiries (Customer only)
inquiryRouter.get("/my-inquiries", authUser, roleAuth(["customer"]), async (req, res) => {
  try {
    const inquiries = await inquiryModel.find({ userId: req.user._id });
    res.json({ success: true, inquiries });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

// Get all inquiries (Admin/Support)
inquiryRouter.get(
  "/all",
  authUser,
  roleAuth(["admin", "support"]),
  async (req, res) => {
    try {
      const inquiries = await inquiryModel
        .find({})
        .populate("userId", "name email");
      res.json({ success: true, inquiries });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  }
);

// Respond to inquiry (Admin/Support)
inquiryRouter.post(
  "/respond",
  authUser,
  roleAuth(["admin", "support"]),
  async (req, res) => {
    try {
      const { inquiryId, response, status } = req.body;
      await inquiryModel.findByIdAndUpdate(inquiryId, {
        response,
        status: status || "Resolved",
      });
      res.json({ success: true, message: "Response submitted" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  }
);

export default inquiryRouter;
