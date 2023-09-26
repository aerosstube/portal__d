"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.counterparty_types = void 0;
const sequelize_1 = require("sequelize");
class counterparty_types extends sequelize_1.Model {
    static initModel(sequelize) {
        return counterparty_types.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            type: {
                type: sequelize_1.DataTypes.STRING(30),
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'counterparty_types',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "counterparty_types_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.counterparty_types = counterparty_types;
