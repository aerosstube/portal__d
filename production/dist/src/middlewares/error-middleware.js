"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const api_error_1 = require("../errors/api.error");
const ErrorMiddleware = (err, req, res, next) => {
    console.log(err);
    if (err instanceof api_error_1.ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    next(res.status(500).json({ message: 'Непредвиденная ошибка!' }));
};
exports.ErrorMiddleware = ErrorMiddleware;
