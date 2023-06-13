//Import entity
const Student = require('../entity/student');

//Import Student services
const {
    newStudent,
    getAllStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById,
    login,
    logout,
} = require('../service/studentsServices');

//Import error handler 
const ErrorHandler = require("../utils/ErrorHandler");

//Import CatchAsync middleware
const CatchAsyncError = require('../middleware/asyncError');

//POST : Create student, URL : /student/new
exports.newStudentC = CatchAsyncError( async(req, res, next)=>{
    //Return the result of the create student function
    const result = await newStudent(req.body);
    
    //Based on the result and decide on the response 
    if(result){
        res.status(200).json({
            success:true,
            message:"Student created!"
        });
    }
    else{
        return next(new ErrorHandler("Unable to create student.", 500));
    }
});

//GET : Get all students, URL: /students/all
exports.getAllStudentsC = CatchAsyncError( async(req, res, next)=>{
    const allStudents = await getAllStudents()

    if(allStudents){
        res.status(200).json({
            success:true,
            message:"Get all student",
            data : allStudents
        })
    }
    else{
        return next(new ErrorHandler("Fail to get all student.", 500));
    }
});

//GET: Get student by Id, URL: /student/:id
exports.getStudentByIdC = CatchAsyncError( async(req, res, next)=>{
    const student = await getStudentById(req.params.id);
    if(student){
        res.status(200).json({
            success:true,
            message: "Student found!",
            data : student
        });
    }else{
        return next(new ErrorHandler("Student doesn't exisit.", 500));
    }
});

//POST : Update student by Id, URL: /student/update
exports.updateStudentByIdC = CatchAsyncError( async(req,res,next)=>{
    //Call the update student function
    const result = await updateStudentById(req.body._id, req.body);
    if (result){
        res.status(200).json({
            success:true,
            message:"Student updated"
        });
    }
    else{
        return next(new ErrorHandler("Student update failed.", 500));
    }
});

//DELETE : Delete student by id, URL: /student/delete/:id
exports.deleteStudentByIdC = CatchAsyncError( async(req,res,next)=>{
    //call the delete student function
    const result = await deleteStudentById(req.params.id);

    //Return success if user deleted
    if(result){
        res.status(200).json({
            success:true,
            message:"Student deleted"
        });
    }
    else{
        return next(new ErrorHandler("Error in deleting user.", 500));
    }
});

//POST : Login student by email & password, URL: /login
exports.login = CatchAsyncError( async(req, res, next)=>{
    //call the login function in try n catch function
    try{
        const result = await login(req.body.email, req.body.password, req, res);
        if(result){
            res.status(200).json({
                success:true
            })
        }
    }
    catch(err){
        return next(new ErrorHandler("Login error, please try again.", 403));
    }

});

//GET : Logout user and clear JWT token from cookie, URL: /logout
exports.logout =CatchAsyncError( async(req,res,next)=>{
    //Call logout function
    const result = await logout(req, res, next);
    if(result){
        res.status(200).json({
            success:true,
            message:"Logout succes"
        });
    }
    else{
        res.status(200).json({
            success:false,
            message:"Logout failed"
        });
    }
});