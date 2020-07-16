var config = require("../../src/paysafeConfig.json");
var axios = require("axios");

class User {
  async addUser(req) {
    try {
      const body = {
        merchantCustomerId: req.body.username,
        locale: config.locale,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: {
          year: Number(req.body.year),
          month: Number(req.body.month),
          day: Number(req.body.day),
        },
        email: req.body.email,
        phone: req.body.phone,
      };
      const headers = {
        "Content-Type": `application/json;`,
        Authorization: `Basic ${config.credentials.private.base64}`,
        Simulator: "EXTERNAL",
      };
      return await axios.post(
        "https://api.test.paysafe.com/paymenthub/v1/customers",
        body,
        {
          headers: headers,
        }
      );
    } catch (err) {
      return err;
    }
  }
}

module.exports = User;
