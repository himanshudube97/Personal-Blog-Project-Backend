import express from "express";
import { changePassword, createUser, forgetPassword, getUserDetails, logOut, loginUser } from "../controller/userController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";
const router = express.Router();

router.route("/newUser").post(createUser);
router.route("/loginUser").post(loginUser);
router.route("/logoutUser").get(logOut);
router.route("/changePassword").post(isAuthenticatedUser, changePassword);
router.route("/getUserDetails").get(isAuthenticatedUser,getUserDetails);
router.route("/forgetPassword").get(isAuthenticatedUser, forgetPassword);
export default router;