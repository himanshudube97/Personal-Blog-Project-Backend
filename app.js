import express from "express";
import {errorMiddleware}  from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());


import blog from "./routes.js/blogRoutes.js";
import user from "./routes.js/userRoutes.js";

app.use("/api/v1", blog );
app.use("/api/v1", user);


app.use(errorMiddleware);
export default app;