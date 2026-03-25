import express from "express";
import reviewModel from "../models/reviewModel.js";
import productModel from "../models/productModel.js";
import authUser from "../middleware/auth.js";
import roleAuth from "../middleware/roleAuth.js";

const reviewRouter = express.Router();

// Add a review (customer only)
reviewRouter.post("/add", authUser, roleAuth(["customer"]), async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user._id;

    const review = new reviewModel({ userId, productId, rating, comment });
    await review.save();

    // Update product rating
    const reviews = await reviewModel.find({ productId });
    const avgRating =
      reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await productModel.findByIdAndUpdate(productId, {
      ratings: avgRating,
      numReviews: reviews.length,
    });

    res.json({ success: true, message: "Review added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

// Get reviews for a product
reviewRouter.get("/product/:productId", async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({ productId: req.params.productId })
      .populate("userId", "name");
    res.json({ success: true, reviews });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

export default reviewRouter;
