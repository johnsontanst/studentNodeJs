//Import entity
const Student = require('../entity/student');

//Import Student services
const {
    newStudent,
    getAllStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById,
} = require('../service/studentsServices');

//POST : Create student, URL : /student/new
exports.newStudentC = async(req, res, next)=>{
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
        res.status(500).json({
            success:false,
            message:"Error in creating student."
        })
    }
}

//GET : Get all students, URL: /students/all
exports.getAllStudentsC = async(req, res, next)=>{
    const allStudents = await getAllStudents()
    if(allStudents){
        res.status(200).json({
            success:true,
            message:"Get all student",
            data : allStudents
        })
    }
    else{
        res.status(500).json({
            success:false,
            message:"Fail to get all students"
        });
    }
}

//GET: Get student by Id, URL: /student/:id
exports.getStudentByIdC = async(req, res, next)=>{
    const student = await getStudentById(req.params.id);
    if(student){
        res.status(200).json({
            success:true,
            message: "Student found!",
            data : student
        });
    }else{
        res.status(500).json({
            success:false,
            message:"Student doesn't exisit"
        });
    }
}

//POST : Update student by Id, URL: /student/update
exports.updateStudentByIdC = async(req,res,next)=>{
    //Call the update student function
    const result = await updateStudentById(req.body._id, req.body);
    if (result){
        res.status(200).json({
            success:true,
            message:"Student updated"
        });
    }
    else{
        res.status(500).json({
            success:false,
            message:"Student update failed"
        });
    }
}

//DELETE : Delete student by id, URL: /student/delete/:id
exports.deleteStudentByIdC = async(req,res,next)=>{
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
        res.status(500).json({
            success:false,
            message:"Error in deleting user"
        });
    }
}
