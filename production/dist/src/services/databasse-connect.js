"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeConnect = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../../config/config");
exports.SequelizeConnect = new sequelize_1.Sequelize(config_1.database.name, config_1.database.user, config_1.database.password, {
    host: config_1.database.host,
    dialect: config_1.database.dialect,
    port: config_1.database.port,
    logging: false,
    dialectOptions: {
        useUTC: false,
        timezone: '+03:00',
    },
    timezone: '+03:00',
});
