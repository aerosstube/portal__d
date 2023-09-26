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
exports.OrderService = void 0;
const api_error_1 = require("../../errors/api.error");
const order_database_service_1 = require("./order.database.service");
const client_service_1 = require("../client-services/client.service");
const counterparty_service_1 = require("../counterpartie-services/counterparty.service");
const organization_service_1 = require("../organization-services/organization.service");
class OrderService {
    static createOrder(orderInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_database_service_1.OrderDatabaseService.createOrder(orderInfo, transaction);
        });
    }
    static updateOrder(orderInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.getById(orderInfo.id);
            order.order_status_id_fk = orderInfo.order_status_id_fk;
            order.counterparty_id_fk = orderInfo.counterparty_id_fk;
            order.organization_id_fk = orderInfo.organization_id_fk;
            order.date = orderInfo.date;
            order.phone_number = orderInfo.phoneNumber;
            order.client_id_fk = orderInfo.client_id_fk;
            order.comment = orderInfo.comment;
            order.external_id = orderInfo.externalId ? orderInfo.externalId : order.external_id;
            yield order.save({ transaction });
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_database_service_1.OrderDatabaseService.findAll();
            if (orders.length === 0) {
                throw api_error_1.ApiError.BadRequest('Доступных заказов не существует!');
            }
            return orders;
        });
    }
    static getAllStatuses() {
        return __awaiter(this, void 0, void 0, function* () {
            const statuses = yield order_database_service_1.OrderDatabaseService.findAllStatuses();
            if (statuses.length === 0) {
                throw api_error_1.ApiError.BadRequest('Нет доступных статусов заказа!');
            }
            return statuses;
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_database_service_1.OrderDatabaseService.findById(id);
            if (!order) {
                throw api_error_1.ApiError.BadRequest('Такого заказа не существует!');
            }
            return order;
        });
    }
    static isDuplicate(orderInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield order_database_service_1.OrderDatabaseService.findDuplicate(orderInfo);
            return !!(orders);
        });
    }
    static createArrayDto(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = [];
            for (let i = 0; i < order.length; i++) {
                orders.push({
                    id: order[i].id,
                    client: !order[i].client_id_fk ? null : yield client_service_1.ClientService.createDto(yield client_service_1.ClientService.getClientByPK(order[i].client_id_fk)),
                    comment: order[i].comment,
                    counterparty: !order[i].counterparty_id_fk ? null : yield counterparty_service_1.CounterpartyService.createDto(yield counterparty_service_1.CounterpartyService.getCurrentCounterparty(order[i].counterparty_id_fk)),
                    date: order[i].date,
                    order_status: yield this.getOrderStatusById(order[i].order_status_id_fk),
                    organization: !order[i].organization_id_fk ? null : yield organization_service_1.OrganizationService.createDto(yield organization_service_1.OrganizationService.getOrganizationByPK(order[i].organization_id_fk)),
                    phoneNumber: order[i].phone_number,
                    isDeleted: order[i].is_deleted,
                });
            }
            return orders;
        });
    }
    static createDto(order) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                id: order.id,
                client: !order.client_id_fk ? null : yield client_service_1.ClientService.createDto(yield client_service_1.ClientService.getClientByPK(order.client_id_fk)),
                comment: order.comment,
                counterparty: !order.counterparty_id_fk ? null : yield counterparty_service_1.CounterpartyService.createDto(yield counterparty_service_1.CounterpartyService.getCurrentCounterparty(order.counterparty_id_fk)),
                date: order.date,
                order_status: yield this.getOrderStatusById(order.order_status_id_fk),
                organization: !order.organization_id_fk ? null : yield organization_service_1.OrganizationService.createDto(yield organization_service_1.OrganizationService.getOrganizationByPK(order.organization_id_fk)),
                phoneNumber: order.phone_number,
                isDeleted: order.is_deleted,
                externalId: order.external_id
            };
        });
    }
    static markDelete(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield this.getById(id);
            order.is_deleted = !order.is_deleted;
            yield order.save({ transaction });
        });
    }
    static getOrderStatusById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const order_status = yield order_database_service_1.OrderDatabaseService.findOrderStatusById(id);
            if (!order_status) {
                throw api_error_1.ApiError.BadRequest('Неверный id заказа!');
            }
            return order_status;
        });
    }
    static getOrdersBySomeId(option) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_database_service_1.OrderDatabaseService.getOrderBySomeId(option);
        });
    }
}
exports.OrderService = OrderService;
