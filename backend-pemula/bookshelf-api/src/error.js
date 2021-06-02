class BadRequestError extends Error {
  constructor(message = 'Bad Request') {
    super(message);
    this.code = 400;
  }
}

class NotFoundError extends Error {
  constructor(message = 'Not Found') {
    super(message);
    this.code = 404;
  }
}

module.exports = { BadRequestError, NotFoundError };
