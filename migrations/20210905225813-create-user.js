const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: sequelize.UUIDV4
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(50),
      },
      phone: {
        type: Sequelize.STRING(15),
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING(1)
      },
      last_login_at: {
        type: Sequelize.DATE
      },
      last_ip_address: {
        type: Sequelize.STRING
      },
      created_by: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_by: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};