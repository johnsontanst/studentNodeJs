//Import Students repository 
const SutdentsREPO = require('../repository/studentRepository');

//Import entity
const {Student} = require('../entity/student');

//Validations
const studentValidation = require('../utils/StudentValidation');

exports.newStudent = async function(body){
    //Create student
    const student = new Student(body.name, body.password, body.email, body.role);
    //Check if student is valid
    const isStudentValid = studentValidation(student);

    //Call student repository function to insert student 
    if(isStudentValid){
        try{
            const result = await SutdentsREPO.newStudent(student);
            console.log(result);
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
    const isStudentValid = studentValidation(studentObj);

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

    //Define student object and validate
    var studentObj = new Student(student[0].name, student[0].password, student[0].email, student[0].role);
    const isStudentValid = studentValidation(studentObj);

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
    const isStudentValid2 = studentValidation(studentObj);
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
    //Get student from id
    const student = await SutdentsREPO.getStudentById(id);

    //construct student obj & validate user
    const studentObj = new Student(student[0].name, student[0].password, student[0].email, student[0].role);
    const isStudentValid = studentValidation(studentObj);

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