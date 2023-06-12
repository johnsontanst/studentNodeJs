//import packages
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



//Listening to port
app.listen(process.env.PORT, ()=>{
    console.log(`Server started at port: ${process.env.PORT}`);
});