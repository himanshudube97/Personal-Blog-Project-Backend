import express from "express";
const router = express.Router();

import { createBlog, createComment, deleteBlog, deletecomment, getAllBlogs, getSingleBlog, updateBlog} from "../controller/BlogController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";


router.route("/newBlog").post(isAuthenticatedUser,createBlog);
router.route("/getAllBlogs").get(isAuthenticatedUser,getAllBlogs);
router.route("/getSingleBlog/:id").get(isAuthenticatedUser,getSingleBlog);
router.route("/updateBlog").post(isAuthenticatedUser, updateBlog);
router.route("/deleteBlog").post(isAuthenticatedUser, deleteBlog);
router.route("/comment").post(isAuthenticatedUser, createComment);
router.route("/deleteComment").post(isAuthenticatedUser, deletecomment);
export default router;



