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
exports.UserBusinessService = void 0;
const user_roles_1 = require("../../../models/user_roles");
const user_service_1 = require("./user.service");
const users_1 = require("../../../models/users");
const crypto_1 = require("crypto");
const api_error_1 = require("../../errors/api.error");
const auth_database_service_1 = require("../auth-services/auth.database.service");
const client_database_service_1 = require("../client-services/client.database.service");
const client_service_1 = require("../client-services/client.service");
const organization_service_1 = require("../organization-services/organization.service");
const organization_database_service_1 = require("../organization-services/organization.database.service");
class UserBusinessService {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_service_1.UserService.createArrayDto(yield user_service_1.UserService.getAll());
        });
    }
    static getAllRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_roles_1.user_roles.findAll({ raw: true });
        });
    }
    static create(user, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield users_1.users.create({
                external_id: user.externalId ? user.externalId : String((0, crypto_1.randomInt)(1, 1000000)),
                login: user.login,
                email: user.email,
                full_name: user.fullName,
                user_role_id_fk: user.user_role_id_fk,
                password: user.password,
            }, { transaction });
        });
    }
    static change(userInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.UserService.getById(userInfo.id);
            user.login = userInfo.login;
            user.email = userInfo.email;
            user.full_name = userInfo.fullName;
            user.user_role_id_fk = userInfo.user_role_id_fk;
            user.password = userInfo.password;
            user.external_id = userInfo.externalId ? userInfo.externalId : user.external_id;
            yield user.save({ transaction });
        });
    }
    static delete(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.UserService.getById(id);
            if (user) {
                const token = yield auth_database_service_1.AuthDatabaseService.findTokenByUserPK(id);
                if (token) {
                    token.destroy({ transaction });
                }
                const clientHasUser = yield client_database_service_1.ClientDatabaseService.findClientHasUserByUserId(id);
                if (clientHasUser) {
                    yield client_service_1.ClientService.deleteClientRelations(clientHasUser.client_id_fk, transaction);
                }
                const organization = yield organization_database_service_1.OrganizationDatabaseService.findOrganizationByUserId(id);
                if (organization) {
                    yield organization_service_1.OrganizationService.deleteRelations(organization.organization_id_fk, transaction);
                }
                yield user.destroy({ transaction });
            }
            else {
                throw api_error_1.ApiError.BadRequest('Неверный id!');
            }
        });
    }
}
exports.UserBusinessService = UserBusinessService;
