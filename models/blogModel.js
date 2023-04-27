import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    // userId :{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    title: {type: String, required: true},
    description : {type: String, required: true},
    authorName: {type: String, required: true},
    createdBy: {type:String, default: "lotr"},
    isDeleted: {type: Boolean, default: false},
    isSaved: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
})

const Blog = mongoose.model("Blog", blogSchema )
export default Blog;