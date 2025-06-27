import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { authToken } = req.signedCookies;
    if (!authToken)
    return res.status(401).json({ success: true, message: "Unauthorized" });
    const decode = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Session Token Expired or Invalid" });
  }
};
