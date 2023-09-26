"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.AuthService = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../../../config/config");
const api_error_1 = require("../../errors/api.error");
const user_service_1 = require("../user-services/user.service");
const auth_database_service_1 = require("./auth.database.service");
class AuthService {
    static checkUser(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.UserService.findByLogin(login);
            // const isPassword = await compare(password, user.password);
            const isPassword = password === user.password ? true : false;
            if (!isPassword)
                throw api_error_1.ApiError.BadRequest('Ошибка авторизации!');
            return user;
        });
    }
    static validateRefreshToken(refreshToken) {
        try {
            const payload = jwt.verify(refreshToken, config_1.application.refreshToken);
            // @ts-ignore
            return Object.assign(payload);
        }
        catch (e) {
            throw api_error_1.ApiError.UnauthorizedError();
        }
    }
    static generateToken(payload, refreshToken = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                refreshToken: (refreshToken) ? refreshToken : jwt.sign(payload, config_1.application.refreshToken, { expiresIn: '30d' }),
                accessToken: jwt.sign(payload, config_1.application.accessToken, { expiresIn: '15d' }),
            };
        });
    }
    static findUserRole(user_role_id_fk) {
        return __awaiter(this, void 0, void 0, function* () {
            let role = yield auth_database_service_1.AuthDatabaseService.findUserRoleById(user_role_id_fk);
            if (!role) {
                throw api_error_1.ApiError.BadRequest('Проблема авторизации (не смог найти роль)!');
            }
            return role.role;
        });
    }
    static createDeviceInfo(saveToken, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const deviceInfo = {
                userAgent: saveToken.userAgent,
                deviceIp: saveToken.deviceIp,
            };
            let deviceData = yield auth_database_service_1.AuthDatabaseService.findUserDeviceByUA(deviceInfo);
            if (!deviceData) {
                return yield auth_database_service_1.AuthDatabaseService.createUserDevice({
                    device_ip: saveToken.deviceIp,
                    user_agent: saveToken.userAgent,
                }, transaction);
            }
            return deviceData;
        });
    }
    static createTokenData(deviceId, saveToken, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield auth_database_service_1.AuthDatabaseService.findTokenByDevicePK(deviceId);
            if (!tokenData)
                return yield auth_database_service_1.AuthDatabaseService.createToken(saveToken, transaction, deviceId);
            return tokenData;
        });
    }
    static updateRefreshToken(tokenData, refreshToken, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            tokenData.refresh_token = refreshToken;
            yield tokenData.save({ transaction });
        });
    }
    static saveToken(authOptions, user_id, refreshToken, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dateExpired = new Date();
                dateExpired.setDate(dateExpired.getDate() + 30);
                const saveToken = {
                    userId: user_id,
                    refreshToken: refreshToken,
                    userAgent: authOptions.userAgent,
                    dateExpired: dateExpired,
                    deviceIp: authOptions.deviceIp,
                };
                const deviceData = yield this.createDeviceInfo(saveToken, transaction);
                const tokenData = yield this.createTokenData(deviceData.id, saveToken, transaction);
                yield this.updateRefreshToken(tokenData, saveToken.refreshToken, transaction);
            }
            catch (err) {
                throw api_error_1.ApiError.BadRequest('Ошибка авторизации!');
            }
        });
    }
    static deleteToken(refreshToken, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenData = yield auth_database_service_1.AuthDatabaseService.findTokenByPK(refreshToken);
                yield tokenData.destroy({ transaction });
                return tokenData.user_device_id_fk;
            }
            catch (e) {
                throw api_error_1.ApiError.UnauthorizedError();
            }
        });
    }
    static deleteUserDevice(user_device_id_pk, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const deviceData = yield auth_database_service_1.AuthDatabaseService.findDeviceByPK(user_device_id_pk);
            if (deviceData === null)
                throw api_error_1.ApiError.UnauthorizedError();
            yield deviceData.destroy({ transaction });
        });
    }
    static validateAccessToken(accessToken) {
        try {
            const tokenPayload = jwt.verify(accessToken, config_1.application.accessToken);
            // @ts-ignore
            return Object.assign(tokenPayload);
        }
        catch (err) {
            throw api_error_1.ApiError.UnauthorizedError();
        }
    }
}
exports.AuthService = AuthService;
