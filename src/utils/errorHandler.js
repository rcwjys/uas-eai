  import {z} from 'zod';
  import {ValidationError} from './error.js';

  const errorHandler = (err, req, res, next) => {
    if (err instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          error: 'Validation Failed',
          details: err.errors.map(err => ({
            path: err.path.join(),
            message: err.message,
          })),
        });
    } else if (err instanceof ValidationError) {
      res.status(400).json({
        success: false,
        error: 'Validation Failed',
        details: {
          message: err.message
        }
      });
    } else {
      res.status(500).json({
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
