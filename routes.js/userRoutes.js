import express from "express";
import { createUser, logOut, loginUser } from "../controller/userController.js";
const router = express.Router();

router.route("/newUser").post(createUser);
router.route("/loginUser").get(loginUser);
router.route("/logoutUser").get(logOut);

export default router;