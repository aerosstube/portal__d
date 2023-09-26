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
exports.ClientService = void 0;
const api_error_1 = require("../../errors/api.error");
const client_database_service_1 = require("./client.database.service");
const counterparty_service_1 = require("../counterpartie-services/counterparty.service");
const order_service_1 = require("../order-services/order.service");
class ClientService {
    static createClient(user, clientInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield client_database_service_1.ClientDatabaseService.createClient(clientInfo, transaction);
            if (user.role === 'Менеджер') {
                client_database_service_1.ClientDatabaseService.addManagerAccess(user.userId, client.id);
            }
        });
    }
    static getAllClients(clientId = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_database_service_1.ClientDatabaseService.findAllClients(clientId);
        });
    }
    static getManagerClients(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientIds = yield client_database_service_1.ClientDatabaseService.findManagerClients(userId);
            const res = clientIds.map(({ client_id_fk }) => client_id_fk);
            if (res.length === 0) {
                throw api_error_1.ApiError.BadRequest('У менеджера нет доступных партнеров!');
            }
            return res;
        });
    }
    static getClientByPK(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield client_database_service_1.ClientDatabaseService.findClientByPK(id);
            if (!client) {
                throw api_error_1.ApiError.BadRequest('Такого партнера не существует!');
            }
            return client;
        });
    }
    static deleteClientRelations(clientId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOption = {
                where: {
                    client_id_fk: clientId,
                },
            };
            const clientHasUser = yield client_database_service_1.ClientDatabaseService.findClientHasUserByClientId(clientId);
            for (let i = 0; i < clientHasUser.length; i++) {
                yield clientHasUser[i].destroy({ transaction });
            }
            const counterparty = yield counterparty_service_1.CounterpartyService.getCurrentCounterpartySomeId(findOption);
            for (let i = 0; i < counterparty.length; i++) {
                counterparty[i].client_id_fk = null;
                yield counterparty[i].save({ transaction });
            }
            const order = yield order_service_1.OrderService.getOrdersBySomeId(findOption);
            for (let i = 0; i < order.length; i++) {
                order[i].client_id_fk = null;
                yield order[i].save({ transaction });
            }
        });
    }
    static isDuplicate(clientInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield client_database_service_1.ClientDatabaseService.findDuplicate(clientInfo);
            return !!(client);
        });
    }
    static isManagerAccess(userId, clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientIds = yield ClientService.getManagerClients(userId);
            for (let i = 0; i < clientIds.length; i++) {
                if (clientIds[i] === clientId) {
                    return true;
                }
            }
            return false;
        });
    }
    static updateClient(clientInfo, transaction, userId = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userId !== null && !(yield ClientService.isManagerAccess(userId, clientInfo.id))) {
                throw api_error_1.ApiError.BadRequest('Менеджеру недоступна данная организация!');
            }
            const client = yield this.getClientByPK(clientInfo.id);
            client.business_address = clientInfo.businessAddress;
            client.physical_address = clientInfo.physicalAddress;
            client.work_name = clientInfo.workName;
            client.full_name = clientInfo.fullName;
            client.external_id = clientInfo.externalId ? clientInfo.externalId : client.external_id;
            yield client.save({ transaction });
        });
    }
    static createArrayDto(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const clients = [];
            for (let i = 0; i < client.length; i++) {
                clients.push({
                    id: client[i].id,
                    businessAddress: client[i].business_address,
                    fullName: client[i].full_name,
                    physicalAddress: client[i].physical_address,
                    workName: client[i].work_name,
                    isDeleted: client[i].is_deleted,
                });
            }
            return clients;
        });
    }
    static createDto(client) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                id: client.id,
                businessAddress: client.business_address,
                fullName: client.full_name,
                physicalAddress: client.physical_address,
                workName: client.work_name,
                isDeleted: client.is_deleted,
                externalId: client.external_id
            };
        });
    }
    static markDelete(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.getClientByPK(id);
            client.is_deleted = !client.is_deleted;
            yield client.save({ transaction });
        });
    }
}
exports.ClientService = ClientService;
