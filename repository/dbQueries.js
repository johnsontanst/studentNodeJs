var createStudentsTable = 
    "CREATE TABLE IF NOT EXISTS students (_id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(100), password VARCHAR(100), email VARCHAR(100), role VARCHAR(100));"

var insertStudent = 
    "INSERT INTO students (name, password, email, role) VALUE(?,?,?,?);"

var getAllStudents = 
    "SELECT * FROM students;"

var getStudentById = 
    "SELECT * FROM students WHERE _id=?;"

var getStudentByEmail =
    "SELECT * FROM students WHERE email=?;"

var updateStudentById =
    "UPDATE students SET name=?, password=?, email=?, role=? WHERE _id=?;"

var deleteStudentById =
    "DELETE FROM students WHERE _id=?;"

module.exports = {
    "createStudentTable" : createStudentsTable,
    "insertStudent" : insertStudent,
    "getAllStudents" : getAllStudents,
    "getStudentById" : getStudentById,
    "updateStudentById" : updateStudentById,
    "deleteStudentById" : deleteStudentById,
    "getStudentByEmail" : getStudentByEmail,

};