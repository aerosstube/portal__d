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
exports.OrganizationBusinessService = void 0;
const api_error_1 = require("../../errors/api.error");
const utils_1 = require("../../utils/utils");
const organization_service_1 = require("./organization.service");
const organization_database_service_1 = require("./organization.database.service");
class OrganizationBusinessService {
    static createOrganization(user, organizationInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(user.role);
            utils_1.Utils.isDuplicate(yield organization_service_1.OrganizationService.isDuplicate(organizationInfo));
            yield organization_service_1.OrganizationService.createOrganization(user, organizationInfo, transaction);
        });
    }
    static updateOrganization(organizationInfo, user, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(user.role);
            utils_1.Utils.isDuplicate(yield organization_service_1.OrganizationService.isDuplicate(organizationInfo));
            switch (user.role) {
                case 'Администратор':
                    return yield organization_service_1.OrganizationService.updateOrganization(organizationInfo, transaction);
                case 'Менеджер':
                    return yield organization_service_1.OrganizationService.updateOrganization(organizationInfo, transaction, user.userId);
                default:
                    throw api_error_1.ApiError.AccessDenied();
            }
        });
    }
    static delete(organizationId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const organization = yield organization_service_1.OrganizationService.getOrganizationByPK(organizationId);
            yield organization_service_1.OrganizationService.deleteRelations(organizationId, transaction);
            yield organization.destroy({ transaction });
        });
    }
    static markDelete(userRole, id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            yield organization_service_1.OrganizationService.delete(id, transaction);
        });
    }
    static getAllOrganizations(user) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (user.role) {
                case 'Администратор':
                    return yield organization_service_1.OrganizationService.createArrayDto(yield organization_service_1.OrganizationService.getAllOrganizations());
                case 'Менеджер':
                    const organizationIds = yield organization_service_1.OrganizationService.getManagerOrganizations(user.userId);
                    return yield organization_service_1.OrganizationService.createArrayDto(yield organization_service_1.OrganizationService.getAllOrganizations(organizationIds));
                default:
                    throw api_error_1.ApiError.AccessDenied();
            }
        });
    }
    static getCurrentOrganization(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(user.role);
            if (user.role !== 'Администратор' && !(yield organization_service_1.OrganizationService.isManagerAccess(user.userId, id))) {
                throw api_error_1.ApiError.BadRequest('Менеджеру недоступна данная организация!');
            }
            return yield organization_service_1.OrganizationService.createDto(yield organization_service_1.OrganizationService.getOrganizationByPK(id));
        });
    }
    static getMarkedDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield organization_service_1.OrganizationService.createArrayDto(yield organization_database_service_1.OrganizationDatabaseService.findMarkedDeleted());
        });
    }
}
exports.OrganizationBusinessService = OrganizationBusinessService;
