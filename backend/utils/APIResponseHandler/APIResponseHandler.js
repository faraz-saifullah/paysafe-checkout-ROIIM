let ResponseCodes = require("../web/HttpResponseCodes");
let HTTPResponseCodes = new ResponseCodes();

class APIResponseHandler {
  handle(response, result) {
    if (result.success) {
      return response.status(result.status).send(result);
    } else {
      return response
        .status(HTTPResponseCodes.INTERNAL_SERVER_ERROR())
        .send(result);
    }
  }

  handlePaysafe(response, result) {
    if (result.status === 201) {
      return response.status(result.status).send(result.data);
    } else {
      return response
        .status(HTTPResponseCodes.INTERNAL_SERVER_ERROR())
        .send(result);
    }
  }
}

module.exports = APIResponseHandler;
