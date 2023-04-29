import express from "express";
import {errorMiddleware}  from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import Blog from "./models/blogModel.js";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());


import blog from "./routes.js/blogRoutes.js";
import user from "./routes.js/userRoutes.js";

app.use("/api/v1", blog );
app.use("/api/v1", user);

// app.get("/h", async(req, res)=>{
//     let result = await Blog.updateMany({likes:[]})
//     res.json({
//         result
//     })
// } )

app.use(errorMiddleware);
export default app;