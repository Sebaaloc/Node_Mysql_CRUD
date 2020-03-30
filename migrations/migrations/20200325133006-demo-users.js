'use strict';

const users = require('./seeds/users');

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable('person', {
        name: { type: Sequelize.STRING, allowNull: false },
        last_name: { type: Sequelize.STRING, allowNull: false },
        id: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
        mail: { type: Sequelize.STRING, allowNull: false },
        phone: { type: Sequelize.STRING, allowNull: false }
      })
      .then(() => queryInterface.bulkInsert('person', users)),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('person')
};
