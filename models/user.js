'use strict';
var bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            comment: 'Identifier of the table'
        },
        uuid: {
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: sequelize.UUIDV4
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
        last_login_at: DataTypes.DATE,
        last_ip_address: DataTypes.STRING,
        is_active: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
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
