const roleAuth = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.json({ success: false, message: "User not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.json({
        success: false,
        message: `Role ${req.user.role} is not authorized to access this resource`,
      });
    }

    next();
  };
};

export default roleAuth;
