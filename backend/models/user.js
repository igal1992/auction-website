const mongoose = require('mongoose')
const Scheme = mongoose.Schema;

const user = new Scheme({
    email:{type:String, required:true, unique:true},
    fullName:{type:String, required:true},
    password:{type:String, required:true}
})

const User = mongoose.model('Users',user)
module.exports = User;