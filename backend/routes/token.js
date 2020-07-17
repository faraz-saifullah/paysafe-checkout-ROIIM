let express = require("express");
let router = express.Router();
let Token = require("../core/tokenController");
let APIResponseHandler = require("../utils/APIResponseHandler/APIResponseHandler");

router.post("/", async function (req, res, next) {
  let result = await new Token().createSingleUseToken(req);
<<<<<<< HEAD
  console.log("Token Creation Request: ", req.body);
  if (result.data) console.log("Token Creation Response", result.data);
  else console.error("Token Creation Error Response", result);
=======
  console.log('Token Creation Request: ', req.body);
  if (result.data)
    console.log('Token Creation Response', result.data);
  else
    console.log('Token Creation Error Response', result);
>>>>>>> 713bb01... Error logging
  return new APIResponseHandler().handlePaysafe(res, result);
});

module.exports = router;
