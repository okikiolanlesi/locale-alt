import AppError from "../utils/AppError";
import User from "../models/user.model";

class AuthMiddleware {
  verifyToken = async (req, res, next) => {
    const token = req.headers["x-api-key"];
    if (!token) {
      return next(new AppError("No token provided", 401));
    }
    const user = await User.findOne({ apiKey: token });
    if (!user) {
      return next(new AppError("Invalid token", 401));
    }
    req.user = user;
    next();
  };
}

export default new AuthMiddleware();
