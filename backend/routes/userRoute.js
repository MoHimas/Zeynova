import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  getProfile,
  updateProfile,
  listUsers,
} from "../controllers/userController.js";
import authUser from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/profile", authUser, getProfile);
userRouter.post("/update-profile", authUser, updateProfile);
userRouter.get("/list", adminAuth, listUsers);

export default userRouter;
