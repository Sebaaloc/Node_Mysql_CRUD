const { inspect } = require('util');

const errors = require('../errors');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.NOT_FOUND]: 404,
  [errors.BAD_REQUEST]: 400,
  [errors.UNAUTHORIZED]: 401,
  [errors.DATABASE_ERROR]: 503,
  [errors.DEFAULT_ERROR]: 500
};

exports.handle = (error, _, res, next) => {
  res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  if (res.statusCode >= 500) {
    next(error);
  }
  return res.send({ message: error.message, internal_code: error.internalCode || errors.DEFAULT_ERROR });
};
