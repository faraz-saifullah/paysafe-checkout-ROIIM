"use strict";
class HTTPResponseCodes {
  OK() {
    return 200;
  }

  CREATED() {
    return 201;
  }

  NO_CONTENT() {
    return 204;
  }

  NOT_MODIFIED() {
    return 304;
  }

  BAD_REQUEST() {
    return 400;
  }

  UNAUTHORIZED() {
    return 401;
  }

  FORBIDDEN() {
    return 403;
  }

  NOT_FOUND() {
    return 404;
  }

  METHOD_NOT_ALLOWED() {
    return 405;
  }

  GONE() {
    return 410;
  }

  UNSUPPORTED_MEDIA_TYPE() {
    return 415;
  }

  UNPROCESSABLE_ENTITY() {
    return 422;
  }

  LOCKED() {
    return 423;
  }

  TOO_MANY_REQUESTS() {
    return 429;
  }

  INTERNAL_SERVER_ERROR() {
    return 500;
  }
}

module.exports = HTTPResponseCodes;
