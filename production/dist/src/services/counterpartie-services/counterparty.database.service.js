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
exports.CounterpartyDatabaseService = void 0;
const init_models_1 = require("../../../models/init-models");
const crypto_1 = require("crypto");
class CounterpartyDatabaseService {
    static findAllCounterpartyTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.counterparty_types.findAll({
                raw: true,
                order: [
                    ['type', 'ASC'],
                ],
            });
        });
    }
    static findCounterparties() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.counterparties.findAll({
                order: [
                    ['id', 'ASC'],
                ],
                raw: true,
            });
        });
    }
    static findCounterpartyTypeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.counterparty_types.findOne({
                where: {
                    id: id,
                },
            });
        });
    }
    static putCounterparty(counterpartyInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.counterparties.create({
                external_id: counterpartyInfo.externalId ? counterpartyInfo.externalId : String((0, crypto_1.randomInt)(1, 10000)),
                client_id_fk: counterpartyInfo.client_id_fk,
                full_name: counterpartyInfo.fullName,
                work_name: counterpartyInfo.workName,
                business_address: counterpartyInfo.businessAddress,
                physical_address: counterpartyInfo.physicalAddress,
                inn: counterpartyInfo.inn,
                kpp: counterpartyInfo.kpp,
                counterparty_type_id_fk: counterpartyInfo.counterparty_type_id_fk,
                phone_number: counterpartyInfo.phoneNumber
            }, { transaction });
        });
    }
    static findCounterpartyByPK(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.counterparties.findOne({
                where: {
                    id: id,
                },
            });
        });
    }
    static findDuplicate(counterpartyInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.counterparties.findOne({
                where: {
                    full_name: counterpartyInfo.fullName,
                    work_name: counterpartyInfo.workName,
                    inn: counterpartyInfo.inn,
                    kpp: counterpartyInfo.kpp,
                    business_address: counterpartyInfo.businessAddress,
                    physical_address: counterpartyInfo.physicalAddress,
                    client_id_fk: counterpartyInfo.client_id_fk,
                    counterparty_type_id_fk: counterpartyInfo.counterparty_type_id_fk,
                },
            });
        });
    }
    static findCounterpartyByClientId(option) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.counterparties.findAll(option);
        });
    }
    static getMarkedDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.counterparties.findAll({
                where: {
                    is_deleted: true,
                },
            });
        });
    }
}
exports.CounterpartyDatabaseService = CounterpartyDatabaseService;
