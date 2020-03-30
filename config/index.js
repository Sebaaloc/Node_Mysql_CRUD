const ENVIRONMENT = process.env.NODE_ENV || 'development';

if (ENVIRONMENT !== 'production') {
  require('dotenv').config();
}

const configFile = `./${ENVIRONMENT}`;

const isObject = variable => {
  return variable instanceof Object;
};

const assignObject = (target, source) => {
  if (target && isObject(target) && source && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(target, key)) {
        target[key] = source[key];
      } else {
        assignObject(target[key], source[key]);
      }
    });
    return target;
  }
};

const config = {
  common: {
    database: {
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      host: process.env.HOST
    },
    port: process.env.PORT
  }
};

const customConfig = require(configFile).config;
module.exports = assignObject(customConfig, config);
