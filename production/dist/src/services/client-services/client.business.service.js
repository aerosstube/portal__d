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
exports.ClientBusinessService = void 0;
const api_error_1 = require("../../errors/api.error");
const utils_1 = require("../../utils/utils");
const client_service_1 = require("./client.service");
const client_database_service_1 = require("./client.database.service");
class ClientBusinessService {
    static createClient(user, clientInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(user.role);
            utils_1.Utils.isDuplicate(yield client_service_1.ClientService.isDuplicate(clientInfo));
            yield client_service_1.ClientService.createClient(user, clientInfo, transaction);
        });
    }
    static updateClient(user, clientInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(user.role);
            switch (user.role) {
                case 'Администратор':
                    return yield client_service_1.ClientService.updateClient(clientInfo, transaction);
                case 'Менеджер':
                    return yield client_service_1.ClientService.updateClient(clientInfo, transaction, user.userId);
                default:
                    throw api_error_1.ApiError.AccessDenied();
            }
        });
    }
    static markDelete(userRole, id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            yield client_service_1.ClientService.markDelete(id, transaction);
        });
    }
    static delete(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield client_service_1.ClientService.getClientByPK(id);
            yield client_service_1.ClientService.deleteClientRelations(id, transaction);
            yield client.destroy({ transaction });
        });
    }
    static getAllClients(user) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (user.role) {
                case 'Администратор':
                    return yield client_service_1.ClientService.createArrayDto(yield client_service_1.ClientService.getAllClients());
                case 'Менеджер':
                    const clientIds = yield client_service_1.ClientService.getManagerClients(user.userId);
                    return yield client_service_1.ClientService.createArrayDto(yield client_service_1.ClientService.getAllClients(clientIds));
                default:
                    throw api_error_1.ApiError.AccessDenied();
            }
        });
    }
    static getMarkedDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_service_1.ClientService.createArrayDto(yield client_database_service_1.ClientDatabaseService.findMarkedDeleted());
        });
    }
    static getCurrentClient(user, clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(user.role);
            if (user.role !== 'Администратор' && !(yield client_service_1.ClientService.isManagerAccess(user.userId, clientId))) {
                throw api_error_1.ApiError.BadRequest('Менеджеру недоступна данная организация!');
            }
            return yield client_service_1.ClientService.createDto(yield client_service_1.ClientService.getClientByPK(clientId));
        });
    }
}
exports.ClientBusinessService = ClientBusinessService;
