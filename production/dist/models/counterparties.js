"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.counterparties = void 0;
const sequelize_1 = require("sequelize");
class counterparties extends sequelize_1.Model {
    static initModel(sequelize) {
        return counterparties.init({
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
            client_id_fk: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'clients',
                    key: 'id'
                }
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
            inn: {
                type: sequelize_1.DataTypes.STRING(12),
                allowNull: true
            },
            kpp: {
                type: sequelize_1.DataTypes.STRING(9),
                allowNull: true
            },
            counterparty_type_id_fk: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'counterparty_types',
                    key: 'id'
                }
            },
            is_deleted: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            phone_number: {
                type: sequelize_1.DataTypes.STRING(12),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'counterparties',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "counterparties_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.counterparties = counterparties;
