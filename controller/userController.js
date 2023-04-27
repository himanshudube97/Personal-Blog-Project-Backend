import User from "../models/userModel.js";
import Errorhandler from "../utils/errorhandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email: email, isDeleted: false });

    if (user) return next(new Errorhandler("User already exists", 400));

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

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) return next(new Errorhandler("User dosent exist", 400));

    let comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword)
      return next(new Errorhandler("Wrong email or password", 400));

    const payload = {
      id: user._id,
      name: user.name,
      role: user.role,
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

export const logOut = async(req, res, next)=>{
    res.cookie("token", null, {
        expire: new Date(Date.now()),
        httpOnly: true,
    } );

    res.status(200).json({
        success: true,
        message: "Logged Out successfully"
    })
};


//1- confirm password not done
//2- reset password not done
//3- login after registering not done.