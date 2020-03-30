const config = require('../config').common.database;

module.exports = {
  development: {
    username: config.username,
    password: config.password,
    database: config.database,
    host: config.host,
    dialect: 'mysql',
    port: '3306',
    logging: true
  },
  testing: {
    username: config.username,
    password: config.password,
    database: config.database,
    host: config.host,
    dialect: 'mysql',
    logging: false
  },
  production: {
    username: config.username,
    password: config.password,
    database: config.database,
    host: config.host,
    dialect: 'mysql',
    logging: false
  }
};
