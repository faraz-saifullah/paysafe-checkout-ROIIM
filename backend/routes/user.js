const express = require("express");
const router = express.Router();
const User = require("../core/userController");
const APIResponseHandler = require("../utils/APIResponseHandler/APIResponseHandler");

router.post("/", async function (req, res) {
  let result = await new User().addUser(req);
<<<<<<< HEAD
  console.log("User Creation Request", req.body);
  if (result.data) console.log("User Creation Response", result.data);
  else console.error("User Creation Error Response", result);
=======
  console.log('User Creation Request', req.body);
  if (result.data)
    console.log('User Creation Response', result.data);
  else
    console.log('User Creation Error Response', result);
>>>>>>> 713bb01... Error logging
  return new APIResponseHandler().handlePaysafe(res, result);
});

module.exports = router;
