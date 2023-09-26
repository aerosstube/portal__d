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
exports.CounterpartyBusinessService = void 0;
const utils_1 = require("../../utils/utils");
const counterparty_service_1 = require("./counterparty.service");
const order_service_1 = require("../order-services/order.service");
const counterparty_database_service_1 = require("./counterparty.database.service");
class CounterpartyBusinessService {
    static createCounterparty(userRole, counterpartyInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            utils_1.Utils.isDuplicate(yield counterparty_service_1.CounterpartyService.isDuplicate(counterpartyInfo));
            yield counterparty_service_1.CounterpartyService.createCounterparty(counterpartyInfo, transaction);
        });
    }
    static updateCounterparty(userRole, counterpartyInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            yield counterparty_service_1.CounterpartyService.updateCounterparty(counterpartyInfo, transaction);
        });
    }
    static delete(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const counterparty = yield counterparty_service_1.CounterpartyService.getCurrentCounterparty(id);
            const orders = yield order_service_1.OrderService.getOrdersBySomeId({
                where: {
                    counterparty_id_fk: id,
                },
            });
            for (let i = 0; i < orders.length; i++) {
                orders[i].counterparty_id_fk = null;
                yield orders[i].save({ transaction });
            }
            yield counterparty.destroy({ transaction });
        });
    }
    static markDelete(userRole, id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            yield counterparty_service_1.CounterpartyService.markDelete(id, transaction);
        });
    }
    static getCounterpartyTypes(userRole) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            return yield counterparty_service_1.CounterpartyService.getCounterpartyTypes();
        });
    }
    static getCounterpartyList(userRole) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            return yield counterparty_service_1.CounterpartyService.createArrayDto(yield counterparty_service_1.CounterpartyService.getCounterpartyList());
        });
    }
    static getCurrentCounterparty(id, userRole) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            return yield counterparty_service_1.CounterpartyService.createDto(yield counterparty_service_1.CounterpartyService.getCurrentCounterparty(id));
        });
    }
    static getMarkedDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield counterparty_service_1.CounterpartyService.createArrayDto(yield counterparty_database_service_1.CounterpartyDatabaseService.getMarkedDeleted());
        });
    }
}
exports.CounterpartyBusinessService = CounterpartyBusinessService;
