  import {z} from 'zod';
  import {ForbiddenError,NotAuthorizeError,NotFoundError, ValidationError} from './error.js';

  const errorHandler = (err, req, res, next) => {
    if (err instanceof z.ZodError) {
        console.log(err);
        return res.status(400).json({
          success: false,
          error: 'Validation Failed',
          details: err.errors.map(err => ({
            path: err.path.join(),
            message: err.message,
          })),
        });
    } else if (err instanceof ValidationError) {
      return res.status(400).json({
        success: false,
        error: 'Validation Failed',
        details: {
          message: err.message
        }
      });
    } else if (err instanceof ForbiddenError) {
        console.log(err);
        return res.status(403).json({
        success: false,
        error: 'Forbidden Error',
        details: {
          message: err.message
        }
      });
    }else if (err instanceof NotAuthorizeError) {
      console.log(err);
      return res.status(401).json({
        success: false, 
        error: 'Not Authorize',
        details: {
          message: err.message
        }
      });
    } else if (err instanceof NotFoundError) {
      console.log(err);
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: err.message
      })
    }  else {
      console.log(err);
      return res.status(500).json({
        success: false,
        error: "Internal Server Error",
        details: {
          message: err.message,
          stack: err.stack
        }
      });
    }
  };


  export {errorHandler};
