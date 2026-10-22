import { ApiError } from '../utils/ApiError.js';

export const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    const errorMessages = error.errors?.map((err) => `${err.path.join('.')}: ${err.message}`) || [];
    next(new ApiError(400, 'Invalid request data', errorMessages));
  }
};
