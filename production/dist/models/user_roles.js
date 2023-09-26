"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_roles = void 0;
const sequelize_1 = require("sequelize");
class user_roles extends sequelize_1.Model {
    static initModel(sequelize) {
        return user_roles.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            role: {
                type: sequelize_1.DataTypes.STRING(16),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'user_roles',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "user_roles_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.user_roles = user_roles;
