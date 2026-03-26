import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authUser = async (req, res, next) => {
  const { token } = req.headers;

  if (!token || token === "null" || token === "undefined") {
    return res.json({ success: false, message: "not authorized login again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Is it a panel token? (from adminLogin)
    if (token_decode.role === "admin" || token_decode.role === "support") {
      req.user = { _id: `panel_${token_decode.role}`, role: token_decode.role };
      return next();
    }
    
    // Is it an old admin string token? (backward compatibility)
    if (typeof token_decode === "string" && token_decode === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      req.user = { _id: "panel_admin", role: "admin" };
      return next();
    }

    // Otherwise, normal MongoDB user
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
