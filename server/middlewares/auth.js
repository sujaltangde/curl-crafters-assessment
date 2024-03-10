const admin = require("../firebase");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Missing token",
        isLogin: false,
      });
    }

    const decodeValue = await admin.auth().verifyIdToken(token);

    if (decodeValue) {
      req.email = decodeValue.email;
      return next();
    }

    return res.json({
      success: false,
      message: "Invalid Token",
      isLogin: false,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
