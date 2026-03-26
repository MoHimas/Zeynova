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
import roleAuth from "../middleware/roleAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post("/profile", authUser, roleAuth(["customer"]), getProfile);
userRouter.post("/update-profile", authUser, roleAuth(["customer"]), updateProfile);
userRouter.get("/list", authUser, roleAuth(["admin", "support"]), listUsers);

export default userRouter;
