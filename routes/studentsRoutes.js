const express = require('express')
const router = express.Router()

//import controller function
const {
    newStudentC,
    getAllStudentsC,
    getStudentByIdC,
    updateStudentByIdC,
    deleteStudentByIdC
} = require('../controller/studentsController');

//POST : Create student
router.route("/student/new").post(newStudentC);

//GET : Get all student
router.route("/students/all").get(getAllStudentsC);

//GET : Get student by id
router.route("/student/:id").get(getStudentByIdC);

//POST : Update student by id
router.route("/student/update").post(updateStudentByIdC);

//DELETE : Delete student by id
router.route("/student/delete/:id").delete(deleteStudentByIdC);


module.exports = router;