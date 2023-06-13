//Import catch async error
const CatchAsyncError = require('./asyncError');

//Import Error handler 
const ErrorHandler = require('../utils/ErrorHandler');

//Import JWT lib 
const jwt = require('jsonwebtoken');

//Import student repository
const StudentREPO = require('../repository/studentRepository');

//Import student validation
const studentValidation = require('../utils/StudentValidation');

exports.authorizeRoles = (...roles) =>{
    return async(req, res, next)=>{
        //Query db for student based on cookie jwt token
        let token;
        let student;
        
        if(String(req.headers.cookie).startsWith("token=")){
            token = String(req.headers.cookie.split('=')[1]);
        }

        //Return HTTP 403 if no token found
        if(!token){
            return next(new ErrorHandler("Login to access this resources.", 403));
        }

        //Decode token and use the student id to query the db
        const decoded_id = jwt.verify(token, process.env.SECRET_KEY);

        if(decoded_id){
            student = await StudentREPO.getStudentById(decoded_id.id);
        }

        //Validate student to ensure the values are not undefined
        const isStudentValid = studentValidation(student[0]);

        if(isStudentValid && roles.includes(student[0].role)){
            return next();
        }

        return next(new ErrorHandler("Authorization required.", 403));
    }
};