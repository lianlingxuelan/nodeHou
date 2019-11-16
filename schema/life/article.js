const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  id: Number,
  start:  {
    type:Number,
    default:0,
  },
  enjoy: {
    Boolean,
    default:false,
  },
  //内容的标题
  title:String,
  //内容的简介
  description:String,
  //内容的主体
  content:String,
  //内容的分类  关联字段
  // category:{
  //   type:mongoose.Schema.Types.ObjectId,
  //   ref:'categorys'
  // },
  category:String,
  time: String,
  //阅读量
  views:{
    type:Number,
    default:0,
  },
  //作者
  author:{
    type:String,
    ref:'users',
  },
  //评论
  comment:{
    type:Array,
    default:[]
  },
  img: String
})

module.exports = mongoose.model('article',userSchema)
