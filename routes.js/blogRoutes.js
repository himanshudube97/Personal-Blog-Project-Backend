import express from "express";
const router = express.Router();

import { createBlog, createComment, deleteBlog, deletecomment, getAllBlogs, getSingleBlog,like_dislike_blog, updateBlog} from "../controller/BlogController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";


router.route("/newBlog").post(isAuthenticatedUser,createBlog);
router.route("/getAllBlogs").get(getAllBlogs);
router.route("/getSingleBlog/:id").get(isAuthenticatedUser,getSingleBlog);
router.route("/updateBlog").post(isAuthenticatedUser, updateBlog);
router.route("/deleteBlog").post(isAuthenticatedUser, deleteBlog);
router.route("/comment").post(isAuthenticatedUser, createComment);
router.route("/deleteComment").post(isAuthenticatedUser, deletecomment);
router.route("/like_dislike_blog").post(isAuthenticatedUser, like_dislike_blog);
// router.route("/like").post(isAuthenticatedUser, optimizedLikeAndUnlike);
export default router;



