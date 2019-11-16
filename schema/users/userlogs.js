const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username:String,
  password:String,
  ip: String,
  brower: String,
  adress: String,
  OS: String,
  time: {
    type:Date,
    default:new Date,
  },
  isAdmin:{
    type:Boolean,
    default:false,
  }
})

module.exports = mongoose.model('userlogs',userSchema)
