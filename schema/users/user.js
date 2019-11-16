const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    age:Number,
    isAdmin:{
        type:Boolean,
        default:false,
    }
})

module.exports = mongoose.model('users',userSchema)
