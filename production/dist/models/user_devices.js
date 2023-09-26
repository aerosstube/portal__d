"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_devices = void 0;
const sequelize_1 = require("sequelize");
class user_devices extends sequelize_1.Model {
    static initModel(sequelize) {
        return user_devices.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                unique: "user_devices_id_key"
            },
            user_agent: {
                type: sequelize_1.DataTypes.STRING(8192),
                allowNull: false
            },
            device_ip: {
                type: sequelize_1.DataTypes.STRING(256),
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'user_devices',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "user_devices_id_key",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
                {
                    name: "user_devices_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.user_devices = user_devices;
