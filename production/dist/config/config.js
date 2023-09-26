"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = exports.application = void 0;
require("dotenv/config");
exports.application = {
    domain: 'localhost',
    port: 8081,
    accessToken: 'access-token-secret-key',
    refreshToken: 'refresh-token-secret-key',
    logs: './logs',
}, exports.database = {
    port: 5432,
    host: 'postgres_db',
    name: 'portal_d',
    user: 'postgres',
    password: 'root',
    dialect: 'postgres',
};
