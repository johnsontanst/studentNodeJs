//Import Students repository 
const SutdentsREPO = require('../repository/studentRepository');

//Import entity
const {Student} = require('../entity/student');

//Import validations
const studentValidation = require('../utils/StudentValidation');
const studentObjValidation = require('../utils/StudentValidation');
const {passwordEncryption, passwordValidation} = require("../utils/passwordEncryption");

//Import Bcrypt
const bcrypt = require('bcrypt');

//Import sendToken (JWT)
const SendToken = require('../utils/sendToken');

exports.newStudent = async function(body){
    //Create student with hashing password function
    const student = new Student(body.name, await passwordEncryption(body.password), body.email, body.role);
    //Check if student is valid
    const isStudentValid = studentValidation(student);

    //Call student repository function to insert student 
    if(isStudentValid){
        try{
            const result = await SutdentsREPO.newStudent(student);
            if (result){
                return true;
            }
        }catch(err){
            return false;
        }
    }
    else{
        return false;
    }
}

exports.getAllStudents = async function(){
    const allStudents = await SutdentsREPO.getAllStudents();
    if (allStudents){
        return allStudents;
    }
    else{
        return false;
    }
}

exports.getStudentById = async function(id){
    const student = await SutdentsREPO.getStudentById(id);

    //Define student object and validate 
    const studentObj = new Student(student[0].name, student[0].password, student[0].email, student[0].role);
    const isStudentValid = studentObjValidation(studentObj);

    if(isStudentValid){
        return student;
    }
    else{
        return false;
    }
}

exports.updateStudentById = async function(id, body){

    //Get student from id
    const student = await SutdentsREPO.getStudentById(id);
    const isDbStudentValid = studentValidation(student);

    if(!isDbStudentValid){
        return false;
    }

    //Define student object and validate
    var studentObj = new Student(student[0].name, student[0].password, student[0].email, student[0].role);
    const isStudentValid = studentObjValidation(studentObj);

    //Return false if student validation fail else continue 
    if(!isStudentValid){
        return false;
    }

    //Loop through the body attributes and update the student obj
    for(const key in body){
        if(key in studentObj){
            studentObj[key] = body[key];
        }
    }

    //Validate student obj & Update student 
    const isStudentValid2 = studentObjValidation(studentObj);
    if (isStudentValid2){
        const isStudentUpdateValid = await SutdentsREPO.updateStudentById(id,studentObj);
        //Check if the update success
        if(isStudentUpdateValid){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
    
}

exports.deleteStudentById = async function(id){
    //Get student from id and check student fields 
    const student = await SutdentsREPO.getStudentById(id);
    const isDbStudentValid = studentValidation(student[0]);

    if(!isDbStudentValid){
        return false;
    }

    //construct student obj & validate user
    const studentObj = new Student(student[0].name, student[0].password, student[0].email, student[0].role);
    const isStudentValid = studentObjValidation(studentObj);

    //Delete student if exisit 
    if(isStudentValid){
        const result = await SutdentsREPO.deleteStudentById(id);
        //Return true if deleted success
        if(result){
            return result;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

exports.login = async function(email, password, req, res){
    //Get student by email and check student fields 
    const student = await SutdentsREPO.getStudentByEmail(email);
    const isDbStudentValid = studentValidation(student[0]);

    if(!isDbStudentValid){
        return false;
    }

    //Construct student object and validate 
    const studentObj = new Student(student[0].name, student[0].password, student[0].email, student[0].role);
    const isStudentValid = studentObjValidation(studentObj);

    //If student is valid, compare DB password with user input password
    if(isStudentValid){
        const isPasswordValid = await passwordValidation(password, studentObj.password);

        if(isPasswordValid){
            await SendToken(student[0]._id, 200, req, res);
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

exports.logout = async (req, res, next)=>{
    //Clear JWT token from the cookies 
    res.cookie('token', 'none', {
        expires: new Date.now(),
        httpOnly: true
    });

    return true;
}