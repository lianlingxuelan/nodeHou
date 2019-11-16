const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name:String,
  //day:Number,
  time:{
    type:Date,
    default:new Date,
  },
  desc: String,
  author: String
})

module.exports = mongoose.model('timechange',userSchema)
