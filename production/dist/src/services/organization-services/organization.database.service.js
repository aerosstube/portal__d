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
exports.OrganizationDatabaseService = void 0;
const crypto_1 = require("crypto");
const init_models_1 = require("../../../models/init-models");
class OrganizationDatabaseService {
    static findOrganizationByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.organizations_has_users.findOne({
                where: {
                    user_id_fk: userId
                }
            });
        });
    }
    static findManagerOrganizations(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.organizations_has_users.findAll({
                where: {
                    user_id_fk: userId,
                },
                attributes: ['organization_id_fk'],
                raw: true,
            });
        });
    }
    static findDuplicate(organizationInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.organizations.findOne({
                where: {
                    full_name: organizationInfo.fullName,
                    work_name: organizationInfo.workName,
                    business_address: organizationInfo.businessAddress,
                    physical_address: organizationInfo.physicalAddress,
                    inn: organizationInfo.inn,
                    kpp: organizationInfo.kpp,
                },
            });
        });
    }
    static findAllOrganizations(organizationIds = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (organizationIds === null) {
                return yield init_models_1.organizations.findAll();
            }
            else {
                return yield init_models_1.organizations.findAll({
                    where: {
                        id: organizationIds,
                    },
                    order: [
                        ['id', 'ASC'],
                    ],
                    raw: true,
                });
            }
        });
    }
    static findOrganizationByPK(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.organizations.findOne({
                where: {
                    id: id,
                },
            });
        });
    }
    static findOrganizationHasUserByOrganizationId(organizationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.organizations_has_users.findAll({
                where: { organization_id_fk: organizationId },
            });
        });
    }
    static createOrganization(organizationInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.organizations.create({
                external_id: organizationInfo.externalId ? organizationInfo.externalId : String((0, crypto_1.randomInt)(1, 1099999)),
                work_name: organizationInfo.workName,
                business_address: organizationInfo.businessAddress,
                physical_address: organizationInfo.physicalAddress,
                inn: organizationInfo.inn,
                kpp: organizationInfo.kpp,
                full_name: organizationInfo.fullName,
            }, {
                raw: true,
                transaction,
            });
        });
    }
    static addManagerAccess(userId, organizationId, transaction) {
        return init_models_1.organizations_has_users.create({
            user_id_fk: userId,
            organization_id_fk: organizationId,
        }, { transaction });
    }
    static findMarkedDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return init_models_1.organizations.findAll({
                where: {
                    is_deleted: true,
                },
            });
        });
    }
}
exports.OrganizationDatabaseService = OrganizationDatabaseService;
