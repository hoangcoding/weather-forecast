const httpStatus = require('http-status');

class ApiError {
  constructor({
    message, errors, status = httpStatus.INTERNAL_SERVER_ERROR, stack,
  }) {
    this.message = message;
    this.errors = errors;
    this.status = status;
  }
}
module.exports = {
  Error: ApiError,
};
