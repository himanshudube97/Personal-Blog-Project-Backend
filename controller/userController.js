import User from "../models/userModel.js";
import Errorhandler from "../utils/errorhandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    let user = await User.findOne({ email: email, isDeleted: false });

    if (user) return next(new Errorhandler("User already exists", 400));

    if (password !== confirmPassword)
      return next(new Errorhandler("Password didnt match", 400));

    let hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword, "hash");

    const result = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      message: "User Created Successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new Errorhandler("Enter both email and pass"), 400);
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) return next(new Errorhandler("User dosent exist", 400));

    let comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword)
      return next(new Errorhandler("Wrong email or password", 400));

    const payload = {
      id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_KEY_EXPIRE,
    });

    const options = {
      expire: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logOut = async (req, res, next) => {
  try {
    res.cookie("token", "", {
      expire: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    return next(new Errorhandler("fill fields", 400));

  let user = await User.findOne({ _id: req.user._id }).select("+password");

  const comparePassword = await bcrypt.compare(oldPassword, user.password);

  if (!comparePassword)
    return next(new Errorhandler("Password dint match", 400));

  let hashedPassword = await bcrypt.hash(newPassword, 10);

  let result = await User.findOneAndUpdate(
    { _id: req.user._id },
    { password: hashedPassword },
    { new: true }
  );

  res.cookie("token", "", {
    expire: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "password Changed and Logout user",
    result,
  });
};

export const forgetPassword = async (req, res, next)=>{
  
}

//1- confirm password not done
//2- reset password not done
//3- login after registering not done.
