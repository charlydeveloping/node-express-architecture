"use strict";
const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("menus", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        allowNull: false,
        unique: true,
        type: Sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
      },
      fk_menu: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "menus",
          },
          key: "id",
        },
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      icon: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      to: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("menus");
  },
};
