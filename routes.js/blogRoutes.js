import express from "express";
const router = express.Router();

import {createBlog, getAllBlogs, getSingleBlog} from "../controller/BlogController.js";


router.route("/newBlog").post(createBlog);
router.route("/getAllBlogs").get(getAllBlogs);
router.route("/getSingleBlog/:id").get(getSingleBlog);

export default router;



