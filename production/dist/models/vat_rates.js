"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vat_rates = void 0;
const sequelize_1 = require("sequelize");
class vat_rates extends sequelize_1.Model {
    static initModel(sequelize) {
        return vat_rates.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            rate: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'vat_rates',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "vat_rates_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.vat_rates = vat_rates;
