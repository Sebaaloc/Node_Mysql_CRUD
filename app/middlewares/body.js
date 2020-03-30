const { body, validationResult, checkSchema } = require('express-validator');
const errors = require('../errors');

exports.requestValidationRules = _ => {
  return [
    body('name')
      .exists()
      .isString()
      .isLength({ min: 1, max: 50 })
      .withMessage('Body must contain name. Name must contain between 1 and 50 characters'),
    body('last_name')
      .exists()
      .isString()
      .isLength({ min: 1, max: 50 })
      .withMessage('Body must contain last_name. last_name must contain between 1 and 50 characters'),
    body('id')
      .exists()
      .isString()
      .isLength({ min: 1, max: 20 })
      .withMessage('Body must contain id. id must contain between 1 and 20 characters'),
    body('mail')
      .exists()
      .isString()
      .isEmail()
      .isLength({ min: 1, max: 50 })
      .withMessage('Body must contain mail. mail must contain between 1 and 50 characters'),
    body('phone')
      .exists()
      .isString()
      .isLength({ min: 1, max: 15 })
      .withMessage('Body must contain phone. phone must contain between 1 and 15 characters')
  ];
};

exports.requestValidationRulesUpdate = _ => {
  return [
    body('name')
      .optional()
      .isString()
      .isLength({ min: 1, max: 50 })
      .withMessage('Body must contain name. Name must contain between 1 and 50 characters'),
    body('last_name')
      .optional()
      .isString()
      .isLength({ min: 1, max: 50 })
      .withMessage('Body must contain last_name. last_name must contain between 1 and 50 characters'),
    body('id')
      .exists()
      .isString()
      .isLength({ min: 1, max: 20 })
      .withMessage('Body must contain id. id must contain between 1 and 20 characters'),
    body('mail')
      .optional()
      .isString()
      .isEmail()
      .isLength({ min: 1, max: 50 })
      .withMessage('Body must contain mail. mail must contain between 1 and 50 characters'),
    body('phone')
      .optional()
      .isString()
      .isLength({ min: 1, max: 15 })
      .withMessage('Body must contain phone. phone must contain between 1 and 15 characters')
  ];
};

exports.requestValidationRulesDelete = _ => {
  return [
    body('id')
      .exists()
      .isString()
      .isLength({ min: 1, max: 20 })
      .withMessage('Body must contain id. id must contain between 1 and 20 characters')
  ];
};

exports.requestValidationRulesBatch = _ => {
  return [
    body().isArray(),
    body('*.name')
      .exists()
      .isString()
      .isLength({ min: 1, max: 50 })
      .withMessage('Body must contain name. Name must contain between 1 and 50 characters'),
    body('*.last_name')
      .exists()
      .isString()
      .isLength({ min: 1, max: 50 })
      .withMessage('Body must contain last_name. last_name must contain between 1 and 50 characters'),
    body('*.id')
      .exists()
      .isString()
      .isLength({ min: 1, max: 20 })
      .withMessage('Body must contain id. id must contain between 1 and 20 characters'),
    body('*.mail')
      .exists()
      .isString()
      .isEmail()
      .isLength({ min: 1, max: 50 })
      .withMessage('BBody must contain mail. mail must contain between 1 and 50 characters'),
    body('*.phone')
      .exists()
      .isString()
      .isLength({ min: 1, max: 15 })
      .withMessage('Body must contain phone. phone must contain between 1 and 15 characters')
  ];
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
