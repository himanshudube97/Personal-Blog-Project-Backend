import Errorhandler from "../utils/errorhandler.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new Errorhandler("invalid token", 400));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY); //here decodedDAta contains the userinfo, jo humne payload main bheji thi.
  console.log(decodedData, "dta")
  let user = await User.findById(decodedData.id, "name email role _id");
  console.log(user,"user")
  req.user = user;
  next();
};

// here if we use req.user = decodedData then we can save the query on every request. 
// we are not using the find query but it helps as as user if deleted can be checked on every request. 

