var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express 012 by Dockerfile 10' });
});

router.post('/', function(req, res,nex){
  res.sendStatus(200);
  // res.render('index', { title: 'Express' });
});

module.exports = router;
