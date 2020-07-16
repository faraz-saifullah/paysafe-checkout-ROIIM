var config = require("../../src/paysafeConfig.json");
var axios = require("axios");

class Token {
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

module.exports = Token;
