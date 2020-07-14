const express = require("express");
const router = express.Router();
const Admin = require("../core/adminController");
const APIResponseHandler = require("../utils/APIResponseHandler/APIResponseHandler");

router.post("/products", async function (req, res) {
  let result = await new Admin().addProduct(req);
  return new APIResponseHandler().handle(res, result);
});

module.exports = router;
