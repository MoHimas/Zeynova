import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      brand,
      stock,
      offerPrice,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      brand,
      stock: Number(stock),
      offerPrice: Number(offerPrice) || 0,
      bestseller: bestseller === "true" ? true : false,
      Sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "product added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for list product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for removing product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for updating product
const updateProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
      brand,
      stock,
      offerPrice,
    } = req.body;

    const updateData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      brand,
      stock: Number(stock),
      offerPrice: Number(offerPrice) || 0,
      bestseller: bestseller === "true" ? true : false,
      Sizes: JSON.parse(sizes),
    };

    // Handle image updates slot-by-slot
    if (req.files) {
      const product = await productModel.findById(id);
      let imagesUrl = [...(product.image || [])];

      if (req.files.image1) {
        const result = await cloudinary.uploader.upload(req.files.image1[0].path, { resource_type: "image" });
        imagesUrl[0] = result.secure_url;
      }
      if (req.files.image2) {
        const result = await cloudinary.uploader.upload(req.files.image2[0].path, { resource_type: "image" });
        imagesUrl[1] = result.secure_url;
      }
      if (req.files.image3) {
        const result = await cloudinary.uploader.upload(req.files.image3[0].path, { resource_type: "image" });
        imagesUrl[2] = result.secure_url;
      }
      if (req.files.image4) {
        const result = await cloudinary.uploader.upload(req.files.image4[0].path, { resource_type: "image" });
        imagesUrl[3] = result.secure_url;
      }
      updateData.image = imagesUrl;
    }

    await productModel.findByIdAndUpdate(id, updateData);

    res.json({ success: true, message: "Product updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { listProduct, addProduct, removeProduct, singleProduct, updateProduct };
