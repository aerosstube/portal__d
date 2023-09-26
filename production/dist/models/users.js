"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const sequelize_1 = require("sequelize");
class users extends sequelize_1.Model {
    static initModel(sequelize) {
        return users.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            external_id: {
                type: sequelize_1.DataTypes.STRING(38),
                allowNull: false,
                unique: "users_external_id_key"
            },
            login: {
                type: sequelize_1.DataTypes.STRING(64),
                allowNull: false,
                unique: "users_login_key"
            },
            email: {
                type: sequelize_1.DataTypes.STRING(64),
                allowNull: false
            },
            full_name: {
                type: sequelize_1.DataTypes.STRING(256),
                allowNull: false
            },
            user_role_id_fk: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'user_roles',
                    key: 'id'
                }
            },
            password: {
                type: sequelize_1.DataTypes.STRING(512),
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'users',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "users_external_id_key",
                    unique: true,
                    fields: [
                        { name: "external_id" },
                    ]
                },
                {
                    name: "users_login_key",
                    unique: true,
                    fields: [
                        { name: "login" },
                    ]
                },
                {
                    name: "users_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.users = users;
