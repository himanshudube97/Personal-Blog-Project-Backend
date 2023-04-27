import Blog from "../models/blogModel.js";
import Errorhandler from "../utils/errorhandler.js";

export const createBlog = async (req, res, next) => {
  console.log(req.body, "reqboyd");
  try {
    let result = await Blog.create(req.body);

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    let result = await Blog.find({});

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleBlog = async(req, res, next)=>{
    try {
        let blogId = req.params.id;
        let result = await Blog.findById(blogId);

        if(!result) return new Errorhandler("No Result found", 400)

        res.status(200).json({
            success: true,
            result
        })

    } catch (error) {
        next(error);
    }
}