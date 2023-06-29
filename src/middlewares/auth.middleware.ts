import User from "../models/user.model";

class AuthMiddleware {
  verifyToken = async (req, res, next) => {
    const token = req.headers["x-api-key"];
    if (!token) {
      return res.status(401).json({
        auth: false,
        message: "No token provided",
      });
    }
    const user = await User.findOne({ apiKey: token });
    if (!user) {
      return res.status(401).json({
        auth: false,
        message: "Invalid token",
      });
    }
    req.user = user;
    next();
  };
}

export default new AuthMiddleware();
