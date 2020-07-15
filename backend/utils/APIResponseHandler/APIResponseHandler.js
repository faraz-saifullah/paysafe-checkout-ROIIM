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

  handleAuthentication(response, authenticationResponse) {
    if (!authenticationResponse.success) {
      return response.status(400).json(authenticationResponse);
    } else if (authenticationResponse.error) {
      return response.status(500).send(authenticationResponse);
    } else {
      return response.status(200).json(authenticationResponse);
    }
  }

  handlePaysafe(response, result) {
    if (result.status === 201) {
      return response.status(result.status).send(result.data);
    } else {
      return response
        .status(HTTPResponseCodes.CONFLICT())
        .send(result);
    }
  }
}

module.exports = APIResponseHandler;
