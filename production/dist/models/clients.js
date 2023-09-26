"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clients = void 0;
const sequelize_1 = require("sequelize");
class clients extends sequelize_1.Model {
    static initModel(sequelize) {
        return clients.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            external_id: {
                type: sequelize_1.DataTypes.STRING(64),
                allowNull: false
            },
            work_name: {
                type: sequelize_1.DataTypes.STRING(256),
                allowNull: true
            },
            full_name: {
                type: sequelize_1.DataTypes.STRING(10240),
                allowNull: true
            },
            business_address: {
                type: sequelize_1.DataTypes.STRING(1024),
                allowNull: true
            },
            physical_address: {
                type: sequelize_1.DataTypes.STRING(1024),
                allowNull: true
            },
            is_deleted: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        }, {
            sequelize,
            tableName: 'clients',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "clients_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.clients = clients;
