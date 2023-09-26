"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const sequelize_1 = require("sequelize");
class products extends sequelize_1.Model {
    static initModel(sequelize) {
        return products.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            nomenclature_id_fk: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'nomenclature',
                    key: 'id'
                }
            },
            unit_measure_id_fk: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'unit_measures',
                    key: 'id'
                }
            },
            amount: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: true
            },
            cost: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: true
            },
            total: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: true
            },
            sale: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: true
            },
            vat_rate_id_fk: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'vat_rates',
                    key: 'id'
                }
            },
            vat_total: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: true
            },
            total_sum: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: true
            },
            order_id_fk: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'orders',
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
            tableName: 'products',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "products_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.products = products;
