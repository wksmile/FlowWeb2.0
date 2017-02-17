//安全退出就是消除session

var express = require('express'),
     router = express.Router();

router.get('/', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;