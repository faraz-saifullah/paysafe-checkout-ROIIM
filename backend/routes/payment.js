let express = require("express");
let router = express.Router();
let Payment = require("../core/paymentController");
let APIResponseHandler = require("../utils/APIResponseHandler/APIResponseHandler");

router.post("/", async function (req, res, next) {
  let result = await new Payment().processPayment(req);
<<<<<<< HEAD
  console.log("Payment Request:", req.body);
  if (result.data) console.log("Payment Processing Response", result.data);
  else console.error("Payment Processing Error Response", result);
=======
  console.log('Payment Request:', req.body);
  if (result.data)
    console.log('Payment Processing Response', result.data);
  else
    console.log('Payment Processing Error Response', result);
>>>>>>> 713bb01... Error logging
  return new APIResponseHandler().handlePaysafe(res, result);
});

module.exports = router;
