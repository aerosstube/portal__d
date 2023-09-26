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
exports.AuthController = void 0;
const api_error_1 = require("../../../errors/api.error");
const auth_business_service_1 = require("../../../services/auth-services/auth.business.service");
const databasse_connect_1 = require("../../../services/databasse-connect");
class AuthController {
    static userLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body: { user }, socket, cookies: { refreshToken } } = req;
            if (refreshToken) {
                return next(api_error_1.ApiError.BadRequest('Вы авторизованы!'));
            }
            const deviceIp = socket.remoteAddress;
            const authOptions = {
                deviceIp,
                userAgent: JSON.stringify(req.useragent),
                password: user.password,
                login: user.login,
                role: user.role,
            };
            const transaction = yield databasse_connect_1.SequelizeConnect.transaction();
            try {
                const tokens = yield auth_business_service_1.AuthBusinessService.userLogin(authOptions, transaction);
                res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true });
                res.json({
                    tokens,
                });
                yield transaction.commit();
            }
            catch (err) {
                yield transaction.rollback();
                next(err);
            }
        });
    }
    static userLogout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield databasse_connect_1.SequelizeConnect.transaction();
            try {
                const { cookies: { refreshToken } } = req;
                yield auth_business_service_1.AuthBusinessService.userLogout(refreshToken, transaction);
                res.clearCookie('refreshToken');
                yield transaction.commit();
                res.json('Все удалено!');
            }
            catch (err) {
                yield transaction.rollback();
                next(err);
            }
        });
    }
    static userRefresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cookies: { refreshToken } } = req;
                const tokens = yield auth_business_service_1.AuthBusinessService.userRefresh(refreshToken);
                res.json({
                    tokens: tokens,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.AuthController = AuthController;
