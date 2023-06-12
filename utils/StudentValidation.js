//import student 
const Student = require("../entity/student")

function studentValidation(Student){
    for(const key in Student){
        if(Student[key] === undefined){
            return false;
        }
    }
    return true;
}

module.exports = studentValidation