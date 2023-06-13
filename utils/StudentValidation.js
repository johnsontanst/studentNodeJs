//import student 
const Student = require("../entity/student")

//Validate Student object
function studentObjValidation(Student){
    for(const key in Student){
        if(Student[key] === undefined){
            return false;
        }
    }
    return true;
}

//Validate student fields from DB (Not yet construct Student class)
function studentValidation(body){
    if(body.name === undefined) return false;
    if(body.password === undefined) return false;
    if(body.email === undefined) return false;
    if(body.role === undefined) return false;

    return true;
}

module.exports = studentValidation, studentObjValidation