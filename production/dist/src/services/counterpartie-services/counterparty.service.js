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
exports.CounterpartyService = void 0;
const api_error_1 = require("../../errors/api.error");
const counterparty_database_service_1 = require("./counterparty.database.service");
const client_service_1 = require("../client-services/client.service");
class CounterpartyService {
    static createCounterparty(counterpartyInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield counterparty_database_service_1.CounterpartyDatabaseService.putCounterparty(counterpartyInfo, transaction);
        });
    }
    static updateCounterparty(counterpartyInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const counterparty = yield this.getCurrentCounterparty(counterpartyInfo.id);
            counterparty.inn = counterpartyInfo.inn;
            counterparty.kpp = counterpartyInfo.kpp;
            counterparty.business_address = counterpartyInfo.businessAddress;
            counterparty.physical_address = counterpartyInfo.physicalAddress;
            counterparty.counterparty_type_id_fk = counterpartyInfo.counterparty_type_id_fk;
            counterparty.client_id_fk = counterpartyInfo.client_id_fk;
            counterparty.full_name = counterpartyInfo.fullName;
            counterparty.work_name = counterpartyInfo.workName;
            counterparty.phone_number = counterpartyInfo.phoneNumber;
            counterparty.external_id = counterpartyInfo.externalId ? counterpartyInfo.externalId : counterparty.external_id;
            yield counterparty.save({ transaction });
        });
    }
    static getCurrentCounterparty(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const counterparty = yield counterparty_database_service_1.CounterpartyDatabaseService.findCounterpartyByPK(id);
            if (!counterparty) {
                throw api_error_1.ApiError.BadRequest('Такого контрагента не существует!');
            }
            return counterparty;
        });
    }
    static getCounterpartyTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            const counterpartyTypes = yield counterparty_database_service_1.CounterpartyDatabaseService.findAllCounterpartyTypes();
            if (counterpartyTypes.length === 0) {
                throw api_error_1.ApiError.BadRequest('Такого типа у контрагента не существует!');
            }
            return counterpartyTypes;
        });
    }
    static getCounterpartyTypeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const counterpartyType = yield counterparty_database_service_1.CounterpartyDatabaseService.findCounterpartyTypeById(id);
            if (!counterpartyType) {
                throw api_error_1.ApiError.BadRequest('Неверный id контрагента!');
            }
            return counterpartyType;
        });
    }
    static getCurrentCounterpartySomeId(option) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield counterparty_database_service_1.CounterpartyDatabaseService.findCounterpartyByClientId(option);
        });
    }
    static getCounterpartyList() {
        return __awaiter(this, void 0, void 0, function* () {
            const counterpartyList = yield counterparty_database_service_1.CounterpartyDatabaseService.findCounterparties();
            if (counterpartyList.length === 0) {
                throw api_error_1.ApiError.BadRequest('Контрагентов не существует!');
            }
            return counterpartyList;
        });
    }
    static isDuplicate(counterpartyInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const counterparty = yield counterparty_database_service_1.CounterpartyDatabaseService.findDuplicate(counterpartyInfo);
            return !!(counterparty);
        });
    }
    static createArrayDto(counterparty) {
        return __awaiter(this, void 0, void 0, function* () {
            const counterparties = [];
            for (let i = 0; i < counterparty.length; i++) {
                counterparties.push({
                    id: counterparty[i].id,
                    businessAddress: counterparty[i].business_address,
                    counterparty_type: yield this.getCounterpartyTypeById(counterparty[i].counterparty_type_id_fk),
                    client: !counterparty[i].client_id_fk ? null : yield client_service_1.ClientService.createDto(yield client_service_1.ClientService.getClientByPK(counterparty[i].client_id_fk)),
                    fullName: counterparty[i].full_name,
                    inn: counterparty[i].inn,
                    kpp: counterparty[i].kpp,
                    physicalAddress: counterparty[i].physical_address,
                    workName: counterparty[i].work_name,
                    isDeleted: counterparty[i].is_deleted,
                    phoneNumber: counterparty[i].phone_number,
                });
            }
            return counterparties;
        });
    }
    static createDto(counterparty) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                id: counterparty.id,
                businessAddress: counterparty.business_address,
                counterparty_type: yield this.getCounterpartyTypeById(counterparty.counterparty_type_id_fk),
                client: !counterparty.client_id_fk ? null : yield client_service_1.ClientService.createDto(yield client_service_1.ClientService.getClientByPK(counterparty.client_id_fk)),
                fullName: counterparty.full_name,
                inn: counterparty.inn,
                kpp: counterparty.kpp,
                physicalAddress: counterparty.physical_address,
                workName: counterparty.work_name,
                isDeleted: counterparty.is_deleted,
                phoneNumber: counterparty.phone_number,
                externalId: counterparty.external_id
            };
        });
    }
    static markDelete(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const counterparty = yield this.getCurrentCounterparty(id);
            counterparty.is_deleted = !counterparty.is_deleted;
            yield counterparty.save({ transaction });
        });
    }
}
exports.CounterpartyService = CounterpartyService;
