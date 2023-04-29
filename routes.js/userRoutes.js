import express from "express";
import { changePassword, createUser, forgetPassword, logOut, loginUser } from "../controller/userController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";
const router = express.Router();

router.route("/newUser").post(createUser);
router.route("/loginUser").get(loginUser);
router.route("/logoutUser").get(logOut);
router.route("/changePassword").post(isAuthenticatedUser, changePassword);
router.route("/forgetPassword").get(isAuthenticatedUser, forgetPassword)
export default router;