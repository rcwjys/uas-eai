class ValidationError extends Error {
  constructor(message) {
    super(message);
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}


export {ValidationError, NotFoundError};