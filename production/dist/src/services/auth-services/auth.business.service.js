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
exports.AuthBusinessService = void 0;
const auth_service_1 = require("./auth.service");
class AuthBusinessService {
    static userLogin(authOptions, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDatabase = yield auth_service_1.AuthService.checkUser(authOptions.login, authOptions.password);
            const role = yield auth_service_1.AuthService.findUserRole(userDatabase.user_role_id_fk);
            const user = {
                fullName: `${userDatabase.full_name}`,
                login: userDatabase.login,
                userId: userDatabase.id,
                role: role,
            };
            const tokens = yield auth_service_1.AuthService.generateToken(user);
            yield auth_service_1.AuthService.saveToken(authOptions, userDatabase.id, tokens.refreshToken, transaction);
            return Object.assign({}, tokens);
        });
    }
    static userLogout(refreshToken, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield auth_service_1.AuthService.deleteToken(refreshToken, transaction);
            yield auth_service_1.AuthService.deleteUserDevice(tokenData, transaction);
        });
    }
    static userRefresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = auth_service_1.AuthService.validateRefreshToken(refreshToken);
            return auth_service_1.AuthService.generateToken({
                fullName: user.fullName,
                login: user.login,
                userId: user.userId,
                role: user.role,
            }, refreshToken);
        });
    }
}
exports.AuthBusinessService = AuthBusinessService;
