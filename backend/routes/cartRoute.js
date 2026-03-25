import express from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";
import roleAuth from "../middleware/roleAuth.js";

const cartRouter = express.Router();

cartRouter.post("/get", authUser, roleAuth(["customer"]), getUserCart);
cartRouter.post("/add", authUser, roleAuth(["customer"]), addToCart);
cartRouter.post("/update", authUser, roleAuth(["customer"]), updateCart);

export default cartRouter;
