"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unit_measures = void 0;
const sequelize_1 = require("sequelize");
class unit_measures extends sequelize_1.Model {
    static initModel(sequelize) {
        return unit_measures.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: true
            },
            full_name: {
                type: sequelize_1.DataTypes.STRING(30),
                allowNull: true
            },
            is_deleted: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        }, {
            sequelize,
            tableName: 'unit_measures',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "unit_measures_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.unit_measures = unit_measures;
