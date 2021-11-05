"use strict";

const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        uuid: uuidv4(),
        first_name: "Carlos Andres",
        last_name: "Ramirez Garcia",
        email: "charlydeveloping@gmail.com",
        phone: "75800000",
        password: await bcrypt.hash("password", 10),
        status: 'a',
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
