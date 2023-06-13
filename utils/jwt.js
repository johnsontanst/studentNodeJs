//Import JWT token
const jwt = require('jsonwebtoken')

exports.generateJWT = async (studentId)=>{
    if(studentId !== undefined){
        return jwt.sign({id:studentId}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXPIRE_IN});
    }
    else{
        return false;
    }
}