// var WxPay = require();

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // const nonce_str = Math.random().toString(36).substr(2, 15);
    // const nonce_str = Math.random().toString(36).substring(2, 15);

    const timestamp = parseInt(+new Date() / 1000 + '').toString()

    res.render('index', { title: 'This is api page !' });
});

router.get('/users', function (req, res, next) {
    // res.render('index', { title: 'This is api/users page !' });

    res.setHeader('Content-Type', 'application/json');
    // res.end(JSON.stringify({"definition.wolf":{"textures":{"default":"textures/entity/wolf/wolf","angry":"textures/entity/wolf/wolf_angry","tame":"textures/entity/wolf/wolf_tame"},"geometry":{"default":"geometry.wolf"}}}));

    res.end(JSON.stringify({ id: 1, name: "jim57" }));
});

module.exports = router;