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
exports.OrganizationService = void 0;
const api_error_1 = require("../../errors/api.error");
const organization_database_service_1 = require("./organization.database.service");
const order_service_1 = require("../order-services/order.service");
class OrganizationService {
    static createOrganization(user, organizationInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const organization = yield organization_database_service_1.OrganizationDatabaseService.createOrganization(organizationInfo, transaction);
            if (user.role === 'Менеджер') {
                yield organization_database_service_1.OrganizationDatabaseService.addManagerAccess(user.userId, organization.id, transaction);
            }
        });
    }
    static updateOrganization(organizationInfo, transaction, userId = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userId !== null && !(yield this.isManagerAccess(userId, organizationInfo.id))) {
                throw api_error_1.ApiError.BadRequest('Менеджеру недоступна данная организация!');
            }
            const organization = yield this.getOrganizationByPK(organizationInfo.id);
            organization.inn = organizationInfo.inn;
            organization.kpp = organizationInfo.kpp;
            organization.business_address = organizationInfo.businessAddress;
            organization.physical_address = organizationInfo.physicalAddress;
            organization.full_name = organizationInfo.fullName;
            organization.work_name = organizationInfo.workName;
            yield organization.save({ transaction });
        });
    }
    static delete(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const organization = yield this.getOrganizationByPK(id);
            organization.is_deleted = !organization.is_deleted;
            yield organization.save({ transaction });
        });
    }
    static deleteRelations(organizationId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const findOption = {
                where: {
                    organization_id_fk: organizationId,
                },
            };
            const orders = yield order_service_1.OrderService.getOrdersBySomeId(findOption);
            for (let i = 0; i < orders.length; i++) {
                orders[i].organization_id_fk = null;
                yield orders[i].save({ transaction });
            }
            const organizationHasUsers = yield organization_database_service_1.OrganizationDatabaseService.findOrganizationHasUserByOrganizationId(organizationId);
            for (let i = 0; i < organizationHasUsers.length; i++) {
                yield organizationHasUsers[i].destroy({ transaction });
            }
        });
    }
    ;
    static getManagerOrganizations(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const organizationIds = yield organization_database_service_1.OrganizationDatabaseService.findManagerOrganizations(userId);
            const res = organizationIds.map(({ organization_id_fk }) => organization_id_fk);
            if (res.length === 0) {
                throw api_error_1.ApiError.BadRequest('У менеджера нет доступных организаций!');
            }
            return res;
        });
    }
    static getOrganizationByPK(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const organization = yield organization_database_service_1.OrganizationDatabaseService.findOrganizationByPK(id);
            if (!organization) {
                throw api_error_1.ApiError.BadRequest('Такой организации не существует!');
            }
            return organization;
        });
    }
    static getAllOrganizations(organizationIds = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const organizations = yield organization_database_service_1.OrganizationDatabaseService.findAllOrganizations(organizationIds);
            if (organizations.length === 0) {
                throw api_error_1.ApiError.BadRequest('Таких организаций не существует, либо у вас нет доступа к организациям!');
            }
            return organizations;
        });
    }
    static isDuplicate(organizationInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield (organization_database_service_1.OrganizationDatabaseService.findDuplicate(organizationInfo)));
        });
    }
    static isManagerAccess(userId, organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const managerOrganizations = yield this.getManagerOrganizations(userId);
            for (let i = 0; i < managerOrganizations.length; i++) {
                if (managerOrganizations[i] === organizationId) {
                    return true;
                }
            }
            return false;
        });
    }
    static createArrayDto(organization) {
        return __awaiter(this, void 0, void 0, function* () {
            const organizations = [];
            for (let i = 0; i < organization.length; i++) {
                organizations.push({
                    id: organization[i].id,
                    workName: organization[i].work_name,
                    fullName: organization[i].full_name,
                    businessAddress: organization[i].business_address,
                    physicalAddress: organization[i].physical_address,
                    inn: organization[i].inn,
                    kpp: organization[i].kpp,
                    isDeleted: organization[i].is_deleted,
                });
            }
            return organizations;
        });
    }
    static createDto(organization) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                id: organization.id,
                workName: organization.work_name,
                fullName: organization.full_name,
                businessAddress: organization.business_address,
                physicalAddress: organization.physical_address,
                inn: organization.inn,
                kpp: organization.kpp,
                isDeleted: organization.is_deleted,
                externalId: organization.external_id
            };
        });
    }
}
exports.OrganizationService = OrganizationService;
