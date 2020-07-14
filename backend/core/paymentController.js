const UsersDbConnector = require("../dbConnector/products");

class Payment {
  constructor() {
  }

  async processPayment(req) {
    try {
      //write payment processing logic here
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Payment;
