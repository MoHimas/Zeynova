import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token || token === "null" || token === "undefined") {
    return res.json({ success: false, message: "not authorized login again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(token_decode.id);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    req.user = user;
    
    // Ensure req.body exists before assigning userId
    if (req.body) {
      req.body.userId = user._id; 
    }
    
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
