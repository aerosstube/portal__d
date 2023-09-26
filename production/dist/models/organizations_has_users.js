"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizations_has_users = void 0;
const sequelize_1 = require("sequelize");
class organizations_has_users extends sequelize_1.Model {
    static initModel(sequelize) {
        return organizations_has_users.init({
            id: {
                autoIncrement: true,
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            user_id_fk: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            organization_id_fk: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'organizations',
                    key: 'id'
                }
            }
        }, {
            sequelize,
            tableName: 'organizations_has_users',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "organizations_has_users_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.organizations_has_users = organizations_has_users;
