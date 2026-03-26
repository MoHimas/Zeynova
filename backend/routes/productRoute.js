import express from "express";
import {
  listProduct,
  addProduct,
  removeProduct,
  singleProduct,
  updateProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import authUser from "../middleware/auth.js";
import roleAuth from "../middleware/roleAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  authUser,
  roleAuth(["admin"]),
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post(
  "/update",
  authUser,
  roleAuth(["admin"]),
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  updateProduct
);
productRouter.post("/remove", authUser, roleAuth(["admin"]), removeProduct);
productRouter.post("/single", singleProduct);
productRouter.get("/list", listProduct);

export default productRouter;
