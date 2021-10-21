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
        first_name: {
          allowNull: false,
          type: DataTypes.STRING(30),
        },
        last_name: {
            allowNull: false,
            type: DataTypes.STRING(30),
          },
        email: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING(50),
            validate: {
                isEmail: true,
            }
        },
        phone: {
            allowNull: false,
            type: DataTypes.STRING(15)
        },
        password: { 
            allowNull: false,
            type: DataTypes.STRING 
        },
        status: { 
            type: DataTypes.STRING(1),
            validate: {
                isIn: [['a', 'i']]
            }
        },
        last_login_at: {
            type: DataTypes.DATE,
        },
        last_ip_address: {
            type: DataTypes.STRING,
            validate: {
                isIP: true
            }
        },
        created_by: DataTypes.INTEGER,
        updated_by: DataTypes.INTEGER,
        deleted_by: DataTypes.INTEGER,
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'users',
        defaultScope: {
            attributes: {
                exclude: ['password']
            }
        },
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
