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
exports.OrderDatabaseService = void 0;
const crypto_1 = require("crypto");
const init_models_1 = require("../../../models/init-models");
const orders_1 = require("../../../models/orders");
class OrderDatabaseService {
    static createOrder(orderInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orders_1.orders.create({
                phone_number: orderInfo.phoneNumber,
                date: orderInfo.date,
                organization_id_fk: orderInfo.organization_id_fk,
                counterparty_id_fk: orderInfo.counterparty_id_fk,
                comment: orderInfo.comment,
                order_status_id_fk: orderInfo.order_status_id_fk,
                client_id_fk: orderInfo.client_id_fk,
                external_id: orderInfo.externalId ? orderInfo.externalId : String((0, crypto_1.randomInt)(1, 100000))
            }, { transaction });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orders_1.orders.findOne({
                where: {
                    id: id,
                },
            });
        });
    }
    static findDuplicate(orderInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orders_1.orders.findOne({
                where: {
                    phone_number: orderInfo.phoneNumber,
                    date: orderInfo.date,
                    organization_id_fk: orderInfo.organization_id_fk,
                    counterparty_id_fk: orderInfo.counterparty_id_fk,
                    comment: orderInfo.comment,
                    order_status_id_fk: orderInfo.order_status_id_fk,
                    client_id_fk: orderInfo.client_id_fk,
                },
            });
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orders_1.orders.findAll({
                order: [
                    ['id', 'ASC'],
                ],
            });
        });
    }
    static findAllStatuses() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.order_status.findAll({
                order: [
                    ['status', 'ASC'],
                ],
            });
        });
    }
    static findOrderStatusById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.order_status.findOne({
                where: {
                    id: id,
                },
            });
        });
    }
    static getOrderBySomeId(option) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield orders_1.orders.findAll(option);
        });
    }
}
exports.OrderDatabaseService = OrderDatabaseService;
