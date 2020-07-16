const express = require("express");
const router = express.Router();
const User = require("../core/userController");
const APIResponseHandler = require("../utils/APIResponseHandler/APIResponseHandler");

router.post("/", async function (req, res) {
  let result = await new User().addUser(req);
  return new APIResponseHandler().handlePaysafe(res, result);
});

module.exports = router;
