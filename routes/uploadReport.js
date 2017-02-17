//基于网页的远程流量液位控制实验

var express = require('express'),
     router = express.Router(),
    User = require('../models/user.js');


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
    res.redirect('/login');
    return;
  }
/*
  User.getUserCourseLog(req.session.username, funcction(startTime, endTime, log){

  });
  */

  res.render('uploadReport',{title:'上传实验报告'});
});


router.post('/', function(req, res) {
  console.log(req.body);
  console.log("=========================");

  res.send('finished!');
;});

module.exports = router;