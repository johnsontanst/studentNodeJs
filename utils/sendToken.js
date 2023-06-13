//Import JWT
const jwt = require('./jwt');

//Import Student class
const Student = require('../entity/student');


const sendToken = async (studentId, statusCode, req, res)=>{
    //Generate JWT token
    const token = await jwt.generateJWT(studentId);

    //Cookie option / Enable HttpOnly to prevent XSS attack
    const options = {
        expires : new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly:true
    };

    //Return respond 
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success:true,
            token
        });
};

module.exports = sendToken;