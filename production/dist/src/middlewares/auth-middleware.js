"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const api_error_1 = require("../errors/api.error");
const auth_service_1 = require("../services/auth-services/auth.service");
const AuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader)
            return next(api_error_1.ApiError.UnauthorizedError());
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken)
            return next(api_error_1.ApiError.UnauthorizedError());
        const verifyToken = yield auth_service_1.AuthService.validateAccessToken(accessToken);
        const isAccess = verifyToken.role === 'Администратор';
        if (req.baseUrl.includes('admin') && !isAccess)
            return next(api_error_1.ApiError.AccessDenied());
        req.user = {
            login: verifyToken.login,
            userId: verifyToken.userId,
            fullName: verifyToken.fullName,
            role: verifyToken.role,
        };
        next();
    }
    catch (err) {
        return next(err);
    }
});
exports.AuthMiddleware = AuthMiddleware;
