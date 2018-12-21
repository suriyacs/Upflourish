module.exports = class ApiError extends Error {
  constructor(error, message) {
    super();
    this.name = error.name;
    this.message = !message ? error.message : message;
    Error.captureStackTrace(this, this.constructor);
  }
};
