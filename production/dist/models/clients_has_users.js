"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clients_has_users = void 0;
const sequelize_1 = require("sequelize");
class clients_has_users extends sequelize_1.Model {
    static initModel(sequelize) {
        return clients_has_users.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            user_id_fk: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            client_id_fk: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'clients',
                    key: 'id'
                }
            }
        }, {
            sequelize,
            tableName: 'clients_has_users',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "clients_has_users_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.clients_has_users = clients_has_users;
