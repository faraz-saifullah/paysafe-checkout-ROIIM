var config = require('../../src/paysafeConfig.json');
var axios = require('axios');
var circularJson = require('circular-json')

class Payment {
  constructor() {
  }

  async processPayment(req) {
    try {
      var body = {
        merchantRefNum: `${req.body.merchantRefNumber}`,
        amount: req.body.amount,
        currencyCode: `${config.currency}`,
        dupCheck: true,
        settleWithAuth: false,
        paymentHandleToken: `${req.body.paymentHandleToken}`,
        customerIp: "172.0.0.1",
        description: "Magazine subscription"
      }
      let headers = {
        'Content-Type': `application/json`,
        'Authorization': `Basic ${config.credentials.private.base64}`,
        'Simulator': 'EXTERNAL'
      }
      let response = await axios.post('https://api.test.paysafe.com/paymenthub/v1/payments', body, {
        headers: headers
      })
      let str = circularJson.stringify(response);
      response = JSON.parse(str);
      return response;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Payment;
