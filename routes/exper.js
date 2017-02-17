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
  res.render('exper0',{title:'基于网页的远程流量液位控制'});
});

router.post('/', function(req, res) {
  console.log(req.body.log);
  User.setUserCourseLog(req.session.username, 1, req.body.log);

  res.send('finished!');
  return;
});


module.exports = router;