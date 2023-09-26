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
exports.AuthDatabaseService = void 0;
const init_models_1 = require("../../../models/init-models");
class AuthDatabaseService {
    static findUserDeviceByUA(deviceInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.user_devices.findOne({
                where: {
                    device_ip: deviceInfo.deviceIp,
                    user_agent: deviceInfo.userAgent,
                },
            });
        });
    }
    static createUserDevice(deviceInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.user_devices.create({
                device_ip: deviceInfo.device_ip,
                user_agent: deviceInfo.user_agent,
            }, { transaction });
        });
    }
    static findTokenByDevicePK(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.tokens.findOne({
                where: {
                    user_device_id_fk: deviceId,
                },
            });
        });
    }
    static findTokenByPK(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return init_models_1.tokens.findOne({
                where: {
                    refresh_token: refreshToken,
                },
            });
        });
    }
    static findTokenByUserPK(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.tokens.findOne({
                where: {
                    user_id_fk: userId
                }
            });
        });
    }
    static createToken(saveToken, transaction, user_device_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.tokens.create({
                user_id_fk: saveToken.userId,
                refresh_token: saveToken.refreshToken,
                date_expired: saveToken.dateExpired,
                user_device_id_fk: user_device_id,
            }, {
                transaction,
            });
        });
    }
    static findUserRoleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return init_models_1.user_roles.findOne({
                where: {
                    id,
                },
            });
        });
    }
    static findDeviceByPK(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return init_models_1.user_devices.findOne({
                where: {
                    id,
                },
            });
        });
    }
}
exports.AuthDatabaseService = AuthDatabaseService;
