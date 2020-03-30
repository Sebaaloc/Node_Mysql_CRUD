const userController = require('./controllers/users');
const bodyValidator = require('./middlewares/body');
const queryValidator = require('./middlewares/query');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger');

exports.init = app => {
  app.get('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument.swaggerDocument));
  app.get(
    '/user',
    [queryValidator.requestValidationRules(), queryValidator.validateSchema(), queryValidator.validate],
    userController.getuser
  );
  app.post(
    '/user',
    [bodyValidator.requestValidationRules(), bodyValidator.validate],
    userController.createUser
  );
  app.patch(
    '/user',
    [bodyValidator.requestValidationRulesUpdate(), bodyValidator.validate],
    userController.updateUser
  );
  app.delete(
    '/user',
    [bodyValidator.requestValidationRulesDelete(), bodyValidator.validate],
    userController.deleteUser
  );
  app.post(
    '/userBatch',
    [bodyValidator.requestValidationRulesBatch(), bodyValidator.validate],
    userController.createUserBatch
  );
};
