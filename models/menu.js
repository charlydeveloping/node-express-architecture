"use strict";
module.exports = (sequelize, DataTypes) => {
  const menu = sequelize.define(
    "menu",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        comment: "Identifier of the table",
      },
      uuid: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        comment: "Second identifier of the table",
      },
      fk_menu: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "menus",
          key: "id",
        },
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(30),
        comment: "Name of the menu",
      },
      icon: {
        allowNull: false,
        type: DataTypes.STRING(30),
        comment: "Icon of the menu",
      },
      to: {
        allowNull: true,
        type: DataTypes.STRING(50),
        comment: "Redirect of the page",
      },
    },
    {
      timestamps: false,
      tableName: "menus",
    }
  );

  menu.associate = function (models) {};

  return menu;
};
