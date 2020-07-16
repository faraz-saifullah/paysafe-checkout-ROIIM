let express = require("express");
let router = express.Router();
let Product = require("../core/productController");
let APIResponseHandler = require("../utils/APIResponseHandler/APIResponseHandler");

router.get("/", async function (req, res, next) {
  let result = await new Product().getAllProducts(req);
  return new APIResponseHandler().handle(res, result);
});

module.exports = router;
