//Import 
const ErrorHandler = require('./utils/ErrorHandler');

//Import packages
const express = require('express');
const app = express();

//env variables 
const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'}); 

//use express json for req body 
app.use(express.json());

//Import routers
const studentRouter = require("./routes/studentsRoutes");

//Routing
app.use("/api", studentRouter);
app.get("/", (req, res, next)=>{
    res.status(200).json({
        success:true,
        message:"Welcome!"
    });
})
//Handle all routes not valid and return HTTP 404
app.all("*", (req,res,next)=>{
    return next(new ErrorHandler("Error 404", 404));
});

//Cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//Middleware
const errorMiddleware = require('./middleware/error');
app.use(errorMiddleware);



//Listening to port
app.listen(process.env.PORT, ()=>{
    console.log(`Server started at port: ${process.env.PORT}`);
});