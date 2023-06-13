const express = require('express')
const router = express.Router()

//import controller function
const {
    newStudentC,
    getAllStudentsC,
    getStudentByIdC,
    updateStudentByIdC,
    deleteStudentByIdC,
    login,
    logout
} = require('../controller/studentsController');

//Import authentication middleware
const {loginAuthentication} = require('../middleware/authentication');

//Import authorization middleware 
const{authorizeRoles} = require('../middleware/authorization');

//POST : Create student
router.route("/student/new").post(newStudentC);

//GET : Get all student
router.route("/students/all").get(loginAuthentication, authorizeRoles('admin'), getAllStudentsC);

//GET : Get student by id
router.route("/student/:id").get(loginAuthentication, getStudentByIdC);

//POST : Update student by id
router.route("/student/update").post(loginAuthentication, updateStudentByIdC);

//DELETE : Delete student by id
router.route("/student/delete/:id").delete(loginAuthentication, deleteStudentByIdC);

//POST : Login student by email
router.route("/login").post(login);

//GET : Logout student and delete JWT token from cookies
router.route("/logout").get(logout);


module.exports = router;