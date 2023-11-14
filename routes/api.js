var jimPackage1 = require('jim-package1');

var WxPay = require('wechatpay-node-v3');
var fs = require('fs');
const pay = new WxPay({
    appid: 'wx6532b0151d3d7415',
    mchid: '1502554621',
    publicKey: fs.readFileSync('./apiclient_cert.pem'), // 公钥
    privateKey: fs.readFileSync('./apiclient_key.pem'), // 秘钥
  });
var express = require('express');
const { request } = require('http');
var router = express.Router();

exports.printMsg = function() {
    console.log("Node.js is awesome!");
  }

/* GET home page. */
router.get('/', function (req, res, next) {

    // jimPackage1.printMsg();
    jimPackage1.printMsg2('jims57');

    const nonce_str = Math.random().toString(36).substr(2, 15), // 随机字符串
    timestamp = parseInt(+new Date() / 1000 + '').toString(), // 时间戳 秒
    url = '/v3/pay/transactions/app';
    // url = 'https://api.mch.weixin.qq.com/v3/pay/transactions/app';

    var out_trade_no = '2217752501201407033233369015';
    var mchid = '1502554621';

    const body = '{"appid":"wx6532b0151d3d7415","mchid":"'+mchid+'","description":"海狮笔记1个月VIP","out_trade_no":"'+out_trade_no+'","notify_url":"https://6897m2y9.imdo.co","amount":{"total":100,"currency":"CNY"}}';

    const signature = pay.getSignature('POST',nonce_str, timestamp, url, body);
    const authorization = pay.getAuthorization(nonce_str, timestamp, signature);

    console.log('body:\n' + body);
    console.log('Authorization:' + authorization)

    res.render('index', { title: 'This is api page !' });
});

router.get('/users', function (req, res, next) {
    // res.render('index', { title: 'This is api/users page !' });

    res.setHeader('Content-Type', 'application/json');
    // res.end(JSON.stringify({"definition.wolf":{"textures":{"default":"textures/entity/wolf/wolf","angry":"textures/entity/wolf/wolf_angry","tame":"textures/entity/wolf/wolf_tame"},"geometry":{"default":"geometry.wolf"}}}));

    res.end(JSON.stringify({ id: 1, name: "jim57" }));
});

module.exports = router;