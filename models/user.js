'use strict';
var bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
          allowNull: false,
          unique: true,
          type: DataTypes.STRING,
        },
        email: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING,
        },
        password: DataTypes.STRING,
        phone: {
            allowNull: false,
            type: DataTypes.STRING(30)
        },
        status: DataTypes.STRING,
    }, {
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        freezeTableName: true,
        tableName: 'users',
        classMethods: {},
        defaultScope: {
            attributes: {
                exclude: ['password']
            }
        },
        scopes: {
            withPassword: {
                attributes: {}
            }
        }
    });
    user.beforeSave((user, options) => {
        if (user.changed('password')) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        }
    });
    user.associate = function (models) {
        
    };
    return user;
};
