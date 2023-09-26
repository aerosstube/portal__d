"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.order_status = void 0;
const sequelize_1 = require("sequelize");
class order_status extends sequelize_1.Model {
    static initModel(sequelize) {
        return order_status.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            status: {
                type: sequelize_1.DataTypes.STRING(128),
                allowNull: false
            }
        }, {
            sequelize,
            tableName: 'order_status',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "order_types_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.order_status = order_status;
