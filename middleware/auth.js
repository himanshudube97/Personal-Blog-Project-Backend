import Errorhandler from "../utils/errorhandler.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new Errorhandler("invalid token", 400));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

  let user = await User.findById(decodedData.id, "name email role _id");

  req.user = user;
  next();
};
