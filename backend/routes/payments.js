let express = require("express");
let router = express.Router();
let Payment = require("../core/paymentController");
let APIResponseHandler = require("../utils/APIResponseHandler/APIResponseHandler");

router.post("/", async function (req, res, next) {
  let result = await new Payment().processPayment(req);
  return new APIResponseHandler().handlePaysafe(res, result);
});

module.exports = router;
