import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token || token === "null" || token === "undefined") {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }

    const tonken_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (
      tonken_decode !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
