const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            unique : true,
            trim : true,
            lowercase : true
        },
        password : {
            type : String,
            required : true,
            minlength : 6
        },
        role :{
            type : String,
            enum : ['user', 'serviceProvider'],
            default : 'user'
        }
    }
);


const User = mongoose.model('User', userSchema);
module.exports = User;