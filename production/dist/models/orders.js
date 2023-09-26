"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders = void 0;
const sequelize_1 = require("sequelize");
class orders extends sequelize_1.Model {
    static initModel(sequelize) {
        return orders.init({
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
            phone_number: {
                type: sequelize_1.DataTypes.STRING(12),
                allowNull: true
            },
            date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
            },
            organization_id_fk: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'organizations',
                    key: 'id'
                }
            },
            counterparty_id_fk: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'counterparties',
                    key: 'id'
                }
            },
            comment: {
                type: sequelize_1.DataTypes.STRING(10240),
                allowNull: true
            },
            order_status_id_fk: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'order_status',
                    key: 'id'
                }
            },
            client_id_fk: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'clients',
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
            tableName: 'orders',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "orders_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.orders = orders;
