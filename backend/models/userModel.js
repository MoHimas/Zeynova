import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["customer", "admin", "support"],
      default: "customer",
    },
    phoneNumber: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String },
    },
    paymentPreferences: { type: Object, default: {} },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);

const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export default userModel;
