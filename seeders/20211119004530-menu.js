"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("menus", [
      {
        uuid: uuidv4(),
        name: "Home",
        fk_menu: null,
        icon: "fas fa-home",
        to: "/",
      },
      {
        uuid: uuidv4(),
        name: "Usuarios",
        fk_menu: null,
        icon: "fas fa-users",
        to: "/admin/users",
      },
      {
        uuid: uuidv4(),
        name: "Config",
        fk_menu: null,
        icon: "fas fa-gear",
      },
      {
        uuid: uuidv4(),
        fk_menu: 3,
        name: "Mi cuenta",
        icon: "fas fa-users",
        to: "/",
      },
      {
        uuid: uuidv4(),
        fk_menu: 3,
        name: "Salir",
        icon: "fas fa-sign-out",
        to: "/",
      },
    ]);
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
