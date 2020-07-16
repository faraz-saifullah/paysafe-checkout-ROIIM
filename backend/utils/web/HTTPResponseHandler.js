class HTTPResponseHandler {
  handleSuccess(message, data, status, token) {
    return {
      success: true,
      status: status ? status : 200,
      message: message,
      data: data,
      token: token,
    };
  }

  handleFailed(message, error, status) {
    return {
      success: false,
      status: status ? status : 500,
      message: message,
      error: error,
    };
  }
}

module.exports = HTTPResponseHandler;
