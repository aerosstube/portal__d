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
exports.ClientDatabaseService = void 0;
const init_models_1 = require("../../../models/init-models");
const crypto_1 = require("crypto");
class ClientDatabaseService {
    static createClient(client, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.clients.create({
                work_name: client.workName,
                full_name: client.fullName,
                business_address: client.businessAddress,
                physical_address: client.physicalAddress,
                external_id: client.externalId ? client.externalId : String((0, crypto_1.randomInt)(1, 100000)),
            }, { transaction });
        });
    }
    static addManagerAccess(userId, clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return init_models_1.clients_has_users.create({
                client_id_fk: clientId,
                user_id_fk: userId,
            });
        });
    }
    static findAllClients(clientId = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (clientId === null) {
                return yield init_models_1.clients.findAll({
                    order: [
                        ['work_name', 'ASC'],
                    ],
                });
            }
            else {
                return yield init_models_1.clients.findAll({
                    where: {
                        id: clientId,
                    },
                    order: [
                        ['work_name', 'ASC'],
                    ],
                    raw: true,
                });
            }
        });
    }
    static findManagerClients(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.clients_has_users.findAll({
                where: {
                    user_id_fk: userId,
                },
                attributes: ['client_id_fk'],
                raw: true,
            });
        });
    }
    static findClientByPK(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.clients.findOne({
                where: {
                    id: id,
                },
            });
        });
    }
    static findDuplicate(clientInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.clients.findOne({
                where: {
                    work_name: clientInfo.workName,
                    full_name: clientInfo.fullName,
                    business_address: clientInfo.businessAddress,
                    physical_address: clientInfo.physicalAddress,
                },
            });
        });
    }
    static findMarkedDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.clients.findAll({
                where: {
                    is_deleted: true,
                },
            });
        });
    }
    static findClientHasUserByClientId(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.clients_has_users.findAll({
                where: {
                    client_id_fk: clientId,
                },
            });
        });
    }
    static findClientHasUserByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.clients_has_users.findOne({
                where: {
                    user_id_fk: userId
                }
            });
        });
    }
}
exports.ClientDatabaseService = ClientDatabaseService;
