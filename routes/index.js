//index通常表示首页，app.use的默认路径'/'
//主要是cookies,session登陆状态的判断
var express = require('express'),
    crypto = require('crypto'),
    User = require('../models/user.js'),
    router = express.Router();



router.get('/', function(req, res) {
  if(req.cookies.islogin)
  { 
       console.log('cookies:' + req.cookies.islogin);
       req.session.username = req.cookies.islogin;
  }  

  if(req.session.username)
  {    
        console.log('session:' + req.session.username);
        res.locals.username = req.session.username;      
  }
  else
  {
        //res.redirect('/login');
        //return;
  }

  res.render('index',{title:'主页'});
});


router.post('/', function(req, res) {
    var userName = req.body['txtUserName'],
        userPwd = req.body['txtUserPwd'],
        isRem = req.body['chbRem'],
        md5 = crypto.createHash('md5');
    console.log(req.body);

    User.getUserByUserName(userName, function (err, results) {

        if(results == '')
        {
            res.locals.error = '用户不存在';
            res.render('login',{title:'登录'});
            return;
        }

        userPwd = md5.update(userPwd).digest('hex');

        console.log(results[0]);

        console.log(userPwd);
        console.log(results[0].userPass);

        console.log(userName);
        console.log(results[0].userName);
        if(results[0].userName != userName || results[0].userPass != userPwd)
        {
            res.locals.error = '用户名或密码有误';
            res.render('login',{title:TITLE_LOGIN});
            console.log(1);
            return;
        }
        else
        {
            if(isRem)
            {
                res.cookie('islogin', userName, { maxAge: 60000 });
            }

            res.locals.username = userName;
            req.session.username = res.locals.username;
            console.log(req.session.username);
            res.redirect('/');
            return;
        }
    });
});

module.exports = router;