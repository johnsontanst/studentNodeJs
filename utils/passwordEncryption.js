//Import bcrypt
const bcrypt = require('bcrypt');

//Import env variables
const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'}); 

//Password encryption
exports.passwordEncryption = async function(password){
    return new Promise((resolve, reject)=>{
        bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS), function(err, hash){
            if(err) throw err;
            resolve(hash);
        });
    });
};

//Compare DB password with user input password
exports.passwordValidation = async function(plainPassword, hashPassword){
    return new Promise((resolve, reject)=>{
        bcrypt.compare(plainPassword, hashPassword, (err, result)=>{
            if(err) throw err;

            if(result) resolve(true);
            else resolve(false);
        });
    });
    
};