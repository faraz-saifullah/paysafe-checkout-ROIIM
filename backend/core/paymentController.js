var config = require("../../src/paysafeConfig.json");
var axios = require("axios");

class Payment {
  async processPayment(req) {
    try {
      var body = {
        merchantRefNum: `${req.body.merchantRefNum}`,
        amount: req.body.amount,
        currencyCode: `${config.currency}`,
        dupCheck: true,
        settleWithAuth: false,
        paymentHandleToken: `${req.body.paymentHandleToken}`,
        customerIp: "172.0.0.1",
        description: "Magazine subscription",
      };
      const headers = {
        "Content-Type": `application/json;`,
        Authorization: `Basic ${config.credentials.private.base64}`,
        Simulator: "EXTERNAL",
        "Access-Control-Allow-Origin": "*",
      };
      return await axios.post(
        "https://api.test.paysafe.com/paymenthub/v1/payments",
        body,
        {
          headers: headers,
        }
      );
    } catch (err) {
      return err.response;
    }
  }

  async createSingleUseToken(req) {
    try {
      const headers = {
        "Content-Type": `application/json;`,
        Authorization: `Basic ${config.credentials.private.base64}`,
        Simulator: "EXTERNAL",
        "Access-Control-Allow-Origin": "*",
      };
      const body = {
        merchantRefNum: `${req.body.merchantRefNum}`,
        paymentTypes: ["CARD"],
      };
      return await axios.post(
        `https://api.test.paysafe.com/paymenthub/v1/customers/${req.body.customerId}/singleusecustomertokens`,
        body,
        {
          headers: headers,
        }
      );
    } catch (err) {
      return err.response;
    }
  }
}

module.exports = Payment;
