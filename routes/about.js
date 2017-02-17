//基于网页的远程流量液位控制实验

var express = require('express'),
     router = express.Router();

router.get('/', function(req, res) {
  res.render('about',{title:'关于我们'});
});

module.exports = router;