"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const api_error_1 = require("../errors/api.error");
class Utils {
    static checkRoleAccess(userRole) {
        if (!(userRole === 'Менеджер' || userRole === 'Администратор')) {
            throw api_error_1.ApiError.AccessDenied();
        }
    }
    static isDuplicate(result) {
        if (result) {
            throw api_error_1.ApiError.BadRequest('Дубликат!');
        }
    }
}
exports.Utils = Utils;
