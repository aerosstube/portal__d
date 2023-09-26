"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokens = void 0;
const sequelize_1 = require("sequelize");
class tokens extends sequelize_1.Model {
    static initModel(sequelize) {
        return tokens.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            refresh_token: {
                type: sequelize_1.DataTypes.STRING(6144),
                allowNull: false
            },
            user_device_id_fk: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'user_devices',
                    key: 'id'
                }
            },
            user_id_fk: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            date_expired: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'tokens',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "tokens_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.tokens = tokens;
