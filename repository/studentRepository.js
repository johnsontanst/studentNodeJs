//Import student class 
const {Student} = require('../entity/student');

//Import db connection 
const {conn} = require('./dbConnection');
//Import queries 
const {
    insertStudent,
    getAllStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById
} = require('./dbQueries');

//Validation 
const studentValidation = require('../utils/StudentValidation');

class studentRepository{

    //Optional to include student
    constructor(Student){
        this.Student = Student;
    }

    //function new student
    static newStudent(Student){
        return new Promise((resolve, reject)=>{
            conn.execute(insertStudent, [Student.name, Student.password, Student.email, Student.role], function(err){
                if(err) throw err;
                resolve(true);
            });
        });
        
    }

    static getAllStudents(){
        const data = new Promise((resolve, reject)=>{
            conn.execute(getAllStudents, function(err, data){
                if(err) throw err;
                resolve(data);
            })
        });
        if(data !== undefined){
            return data;
        }
        else{
            return false;
        }
    }
    
    static getStudentById(id){
        return new Promise((resolve, reject)=>{
            conn.execute(getStudentById, [id], function(err, data){
                if(err) throw err;
                resolve(data);
            });
        });
        
    }

    static updateStudentById(id, Student){
        return new Promise((resolve, reject)=>{
            conn.execute(updateStudentById, [Student.name, Student.password, Student.email, Student.role, id], function(err){
                if(err) throw err;
                resolve(true);
            });
        });
    }

    static deleteStudentById(id){
        return new Promise((resolve, reject)=>{
            conn.execute(deleteStudentById, [id], function(err){
                if (err) throw err;
                resolve(true);
            });
        });
    }
}

module.exports = studentRepository;