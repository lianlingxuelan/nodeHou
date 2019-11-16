const express = require('express')
const Userlogs = require('../../schema/users/userlogs')
const Users = require('../../schema/users/user')
const router = express.Router();
let responseData = {

};

/* GET home page. */
// router.get('/asd', function(req, res, next) {
//     res.send('respond with a resource');
// });

router.get('/asd',(req,res)=>{
        res.send('respond with a resource');
    });
router.post('/register',(req,res)=>{
    console.log(req.body);
    let {username,password} = req.body
    Users.findOne({
        username,
    }).then(user=>{
        if(user){
            responseData.code = 1;
            responseData.message = '该用户已经被注册';
            res.send(responseData);
            return;
        }
        new Users({  //保存注册用户
            username,
            password,
            age:~~(Math.random()*20)+20
        }).save().then(()=>{        //返回前台信息
            responseData.code = 0;
            responseData.message = '注册成功';
            res.send(responseData);
        })
    })
})


router.post('/login',(req,res)=>{
    console.log(req.body);
    let {username,password,ip,brower,OS,adress} = req.body
    Users.findOne({
        username,
        password
    }).then(user=>{
        if(user){
            new Userlogs({  //保存注册用户
                username,
                password,
                ip,
                brower,
                OS,
                adress,
                age:~~(Math.random()*20)+20
            }).save().then(()=>{        //返回前台信息
                responseData.code = 0;
                responseData.message = '登陆成功';
                res.send(responseData);
            })
        }else{
            responseData.code = 1;
            responseData.message = '账号与密码不匹配';
            res.send(responseData);
            return;
        }
    })
});
router.get('/logs',(req,res)=>{
    Userlogs.find().then(item=>{
        res.send(item)
    })
})
module.exports = router;