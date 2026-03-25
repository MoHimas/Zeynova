import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
import roleAuth from "../middleware/roleAuth.js";

const orderRouter = express.Router();

// admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// payment features (customer only)
orderRouter.post("/place", authUser, roleAuth(["customer"]), placeOrder);
orderRouter.post("/stripe", authUser, roleAuth(["customer"]), placeOrderStripe);

// user features (customer only)
orderRouter.post("/userorders", authUser, roleAuth(["customer"]), userOrders);

// verify payment (customer only)
orderRouter.post("/verifyStripe", authUser, roleAuth(["customer"]), verifyStripe);

export default orderRouter;
