const express = require('express');
const errorMW = require('./app/middlewares/error');
const swaggerUi = require('swagger-ui-express');
const config = require('./config/index');
const bodyParser = require('body-parser');
const routes = require('./app/routes');
const logger = require('./app/logger/logger');

const app = express();

app.set('port', config.common.port);

app.use('/api-docs', swaggerUi.serve);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

routes.init(app);

app.use(errorMW.handle);

app.listen(app.get('port'), () => {
  logger.info(`listening on port ${app.get('port')}`);
});

module.exports = app;
