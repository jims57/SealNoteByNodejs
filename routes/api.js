const request = require('superagent');

const WxPay = require('wechatpay-node-v3');
const fs = require('fs');
const pay = new WxPay({
  appid: 'wx6532b0151d3d7415',
  mchid: '1502554621',
  publicKey: fs.readFileSync('./apiclient_cert.pem'), // 公钥
  privateKey: fs.readFileSync('./apiclient_key.pem'), // 秘钥
});

const express = require('express');
const router = express.Router();

async function getPrepayId() {
  const nonce_str = Math.random().toString(36).substring(2, 15), // 随机字符串
    timestamp = parseInt(+new Date() / 1000 + '').toString(), // 时间戳秒
    url = '/v3/pay/transactions/app';

  const out_trade_no = '221775250120140703' + timestamp;
  const mchid = '1502554621';

  const body = '{"appid":"wx6532b0151d3d7415","mchid":"' + mchid + '","description":"海狮笔记1个月VIP","out_trade_no":"' + out_trade_no + '","notify_url":"https://6897m2y9.imdo.co","amount":{"total":100,"currency":"CNY"}}';

  const signature = pay.getSignature('POST', nonce_str, timestamp, url, body);
  const authorization = pay.getAuthorization(nonce_str, timestamp, signature);

  console.log('body:\n' + body);
  console.log('Authorization:' + authorization)

  const result = await request
    .post('https://api.mch.weixin.qq.com/v3/pay/transactions/app')
    .send(body)
    .set({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
      Authorization: authorization,
    });

  console.log('result got');

  return result;
}

/* GET home page. */
router.get('/getPreparyId', async function (req, res, next) {
  const result = await getPrepayId();

  const body = result.body;

  // res.render('index', { title: 'This is api page !' });

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
});

router.get('/users', function (req, res, next) {
  // res.render('index', { title: 'This is api/users page !' });

  res.setHeader('Content-Type', 'application/json');
  // res.end(JSON.stringify({"definition.wolf":{"textures":{"default":"textures/entity/wolf/wolf","angry":"textures/entity/wolf/wolf_angry","tame":"textures/entity/wolf/wolf_tame"},"geometry":{"default":"geometry.wolf"}}}));

  res.end(JSON.stringify({ id: 1, name: "jim57" }));
});

router.get('/testasync', function (req, res, next) {

  // asyncPost();

  res.setHeader('Content-Type', 'text/plain');

  res.end('abc');
});

module.exports = router;