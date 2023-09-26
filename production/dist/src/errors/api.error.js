"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
const sequelize_1 = require("sequelize");
class ApiError extends sequelize_1.Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static BadRequest(message) {
        return new ApiError(400, message);
    }
    static AccessDenied() {
        return new ApiError(401, 'Доступ запрещен!');
    }
    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован!');
    }
    static ValidationError(error = []) {
        return new ApiError(400, 'Ошибка валидации', error);
    }
}
exports.ApiError = ApiError;
