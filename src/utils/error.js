class ValidationError extends Error {
  constructor(message) {
    super(message);
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
  }
}

class NotAuthorizeError extends Error {
  constructor(message) {
    super(message);
  }
 }

class NotFoundError extends Error {
  constructor(message) {
    super(message);
  }
}

export {ValidationError, ForbiddenError, NotFoundError, NotAuthorizeError};