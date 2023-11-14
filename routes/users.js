var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('users', { title: 'Express 012 by Dockerfile 10' });
  // res.render('index', { title: 'Express 012 by Dockerfile 10' });
});

module.exports = router;
