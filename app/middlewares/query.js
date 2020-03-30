const { query, validationResult, checkSchema } = require('express-validator');
const errors = require('../errors');

exports.requestValidationRules = _ => {
  return [
    query('id')
      .isString()
      .withMessage('query must contain id')
  ];
};

exports.validateSchema = _ => {
  return checkSchema({
    id: {
      errorMessage: 'Id should be at least 10 chars long and maximum of 50 chars',
      isLength: {
        options: { min: 1, max: 20 }
      },
      trim: true
    }
  });
};

exports.validate = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  validationErrors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
  throw errors.missingInputArguments(validationErrors.errors);
};
