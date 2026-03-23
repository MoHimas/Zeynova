import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  brand: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  offerPrice: { type: Number, default: 0 },
  Sizes: { type: Array, required: true },
  bestseller: { type: Boolean },
  ratings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  date: { type: Number },
});

const productModel =
  mongoose.model.product || mongoose.model("product", productSchema);

export default productModel;
