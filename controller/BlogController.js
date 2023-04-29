import Blog from "../models/blogModel.js";
import Errorhandler from "../utils/errorhandler.js";

export const createBlog = async (req, res, next) => {
  req.body.userId = req.user._id;
  req.body.createdBy = req.user.role;
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
    let result = await Blog.find({ isDeleted: false });

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleBlog = async (req, res, next) => {

  try {
    let blogId = req.params.id;
    let result = await Blog.findOneAndUpdate(
      { _id: blogId, isDeleted: false },
      { $inc: { noOfViews: 1 } },
      { new: true }
    );

    if (!result) return next(new Errorhandler("No Result found", 400));

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { findQuery, updateQuery } = req.body;

    if (!findQuery || !updateQuery)
      return next(new Errorhandler("Bad request", 400));

    req.body.findQuery.userId = req.user._id; //jisne banaya wahi update kar sakta hai.

    let result = await Blog.findOneAndUpdate(findQuery, updateQuery, {
      new: true,
      upsert: false,
    });

    if (!result) return next(new Errorhandler("Not found"), 400);

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    if (!req.body.findQuery) return next(new Errorhandler("No findQuery", 400));

    req.body.findQuery.userId = req.user._id; //jisne banaya wahi delete kar sakta hai.

    let result = await Blog.findOneAndUpdate(
      req.body.findQuery,
      { isDeleted: true },
      { new: true, upsert: false }
    );
    console.log(result, "result");

    if (!result) return next(new Errorhandler("Not Found", 400));

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

// Create comment
export const createComment = async (req, res, next) => {
  try {
    req.body.comment.userId = req.user._id;

    let blog = await Blog.findOne({ _id: req.body.blogId, isDeleted: false });

    if (!blog) return next(new Errorhandler("Invalid id", 404));

    let commentsArray = [...blog.comments];

    let indexOfComment = commentsArray.findIndex((val) => {
      return val.userId.toString() === req.user._id.toString();
    });

    indexOfComment === -1
      ? commentsArray.push(req.body.comment)
      : (commentsArray[indexOfComment] = req.body.comment);

    let result = await Blog.findOneAndUpdate(
      { _id: req.body.blogId ,isDeleted: false},
      { comments: commentsArray },
      { new: true }
    );

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

//delete comment->

export const deletecomment = async (req, res, next) => {
  try {
    let result = await Blog.updateOne(
      { _id: req.body.blogId, isDeleted: false },
      { $pull: { comments: { userId: req.user._id } } }
    );
    console.log(result, "res");

    if (!result || result.modifiedCount === 0)
      return next(new Errorhandler("Bad", 400));

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

//like blog->

export const like_dislike_blog = async (req, res, next) => {
  try {
    req.body.userId = req.user._id;
    const blog = await Blog.findOne({ _id: req.body.blogId , isDeleted: false});

    let likesArray = [...blog.likes];

    const likeIndex = likesArray.findIndex((val) => {
      return val.toString() === req.body.userId.toString();
    });

    likeIndex === -1
      ? likesArray.push(req.body.userId)
      : likesArray.splice(likeIndex, 1);

    let result = await Blog.findOneAndUpdate(
      { _id: req.body.blogId , isDeleted: false},
      { likes: likesArray },
      { new: true }
    );
    if (!result) return;

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

// export const optimizedLikeAndUnlike = async (req, res, next) => {
//   console.log(req.body);
//   console.log(req.user._id);
//   try {
//     let updateQuery = {
//       like: { $addToSet: { likes: req.user._id } },
//       unlike: { $pull: { likes: req.user._id } },
//     };

//     let result = await Blog.findOneAndUpdate(
//       { _id: req.body.blogId },
//       updateQuery[req.body.likeAction],
//       { new: true }
//     );
//     console.log(result, "res");
//     if (!result) return next(new Errorhandler("error is thrown", 400));

//     res.status(200).json({ success: true, result });
//   } catch (error) {
//     next(error);
//   }
// };
