"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nomenclature = void 0;
const sequelize_1 = require("sequelize");
class nomenclature extends sequelize_1.Model {
    static initModel(sequelize) {
        return nomenclature.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            external_id: {
                type: sequelize_1.DataTypes.STRING(64),
                allowNull: true
            },
            work_name: {
                type: sequelize_1.DataTypes.STRING(256),
                allowNull: true
            },
            full_name: {
                type: sequelize_1.DataTypes.STRING(10240),
                allowNull: true
            },
            unit_measure_id_fk: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'unit_measures',
                    key: 'id'
                }
            },
            is_deleted: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }
        }, {
            sequelize,
            tableName: 'nomenclature',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "nomenclature_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.nomenclature = nomenclature;
