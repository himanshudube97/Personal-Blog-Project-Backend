import Errorhandler from "../utils/errorhandler.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthenticatedUser = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) return next(new Errorhandler("Invalid token", 400));

  const bearer = bearerHeader.split(" ");

  const bearerToken = bearer[1];

  const decodedData = jwt.verify(bearerToken, process.env.JWT_SECRET_KEY);

  let user = await User.findById(decodedData.id, "name email role _id");

  req.user = user;
  next();
};

// here if we use req.user = decodedData then we can save the query on every request.
// we are not using the find query but it helps as as user if deleted can be checked on every request.
