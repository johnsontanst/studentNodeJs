class Student{
    constructor(name, password, email, role){
        this.name = name;
        this.password = password;
        this.email = email;
        this.role = role;
    }
}

module.exports = {
    "Student" : Student,
}