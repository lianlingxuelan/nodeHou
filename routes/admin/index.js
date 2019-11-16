const express = require('express')
// const http = require('http')
 const fs = require('fs')
 const path = require('path')
 const multiparty = require('multiparty');
 const util = require('util');
 const format = require('date-format');
const Timelogs = require('../../schema/logs/indedx')
const Article = require('../../schema/life/article')
//const Image = require('../../public/images')
const router = express.Router();
let responseData = {}


router.post('/article',(req,res)=>{
    console.log(req.body);
    let {
        author,
        content,
        start,
        enjoy,
        title,
        category,
        description,
        time,
        views,
        comment,
        img
    } = req.body;
    console.log(req.body);
    Article.findOne({
        title,
    }).then(req=>{
        if(req){ //如果找到该标题   返回1
            res.send({
                errno:1
            })
        }else{  //如果没找到该标题  返回0
            res.send({
                errno:0
            })
            new Article({ //保存该用户
                author,
                content,
                start,
                enjoy,
                title,
                category,
                description,
                time,
                views,
                comment,
                img
            }).save()
        }
    })
});
router.post('/time',(req,res)=>{
    console.log(req.body);
    let {name,desc,author} = req.body
    // time = format('yyyy-MM-dd hh:mm:ss', new Date())
    // console.log(time);
    new Timelogs({
        name,
        time: format('yyyy-MM-dd hh:mm:ss', new Date()),
        desc,
        author
    }).save().then(()=>{
        responseData.code = 0;
        responseData.message = '添加成功';
        res.send(responseData);
    })
});

router.get('/getTime',(req,res)=>{
    Timelogs.find().then((tiem)=>{
        res.send(tiem)
    })
});

router.post('/image',(req,res)=>{
    //console.log(req);
    //创建一个名字叫做upload的文件夹，路径为：uploadDir
    //console.log(req);
    const uploadDir = path.join(__dirname,"../../public/images")
    const exists = fs.existsSync(uploadDir)

    // 判断是否存在
    if(!exists){
        const err = fs.mkdirSync(uploadDir)
        if(err){
            console.log(err);
        }else{
            console.log('mkdir ok');
        }
    }else{
        console.log('已经存在!!!');
    }
    //第三方包的方法
    const form = new multiparty.Form({uploadDir});
    //console.log(form);
    console.log(req.file);
    form.parse(req, function(err, fields, files) {
        //console.log(files);
        // 文本域：fields
        // 文件域：files
        // Object.keys(data):将对象中的 key/value 变成一个数组可以遍历
        Object.keys(fields).forEach(key=>{
            console.log(`key is ${key}`);
            console.log(`value is ${fields[key][0]}`);

        })
        Object.keys(files).forEach(key=>{
            console.log(files);
            console.log(`key is ${key}`);
            // console.log(files[key][0]);

            // 获取文件的完整路径
            const oldPath = files[key][0].path

            //使用第三包format，用获取到的时间对文件重命名
            const newPath = path.join(__dirname,"../../public/images",`${format('yyyy-MM-dd-hh-mm-ss-SSS', new Date())}.jpg`)
            const err = fs.renameSync(oldPath, newPath)
            if(err){
                console.log(err);
            }else{
                console.log('rename ok');
            }
        })
        res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
    });
})

module.exports = router;