import app from "./app.js";
import connectDatabase from "./config/database.js"
import dotenv from "dotenv";


//Config
dotenv.config({path:"config/config.env"});

connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`Server running on ${process.env.PORT}`)
})