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
exports.OrderController = void 0;
const databasse_connect_1 = require("../../../services/databasse-connect");
const order_business_service_1 = require("../../../services/order-services/order.business.service");
class OrderController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield databasse_connect_1.SequelizeConnect.transaction();
            try {
                const { body: { orderInfo }, user } = req;
                res.status(200).json(yield order_business_service_1.OrderBusinessService.createOrder(user, orderInfo, transaction));
                yield transaction.commit();
            }
            catch (err) {
                yield transaction.rollback();
                next(err);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield databasse_connect_1.SequelizeConnect.transaction();
            try {
                const { body: { orderInfo }, user } = req;
                yield order_business_service_1.OrderBusinessService.updateOrder(user.role, orderInfo, transaction);
                res.status(200).json('Заказ успешно обновлен!');
                yield transaction.commit();
            }
            catch (err) {
                yield transaction.rollback();
                next(err);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield databasse_connect_1.SequelizeConnect.transaction();
            try {
                const { query: { ids }, user } = req;
                if (typeof ids === 'string') {
                    for (const id of ids.split(',')) {
                        yield order_business_service_1.OrderBusinessService.markDelete(user.role, parseInt(id), transaction);
                    }
                }
                res.json('Заказ успешно помечен на удаление!');
                yield transaction.commit();
            }
            catch (err) {
                yield transaction.rollback();
                next(err);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = req;
                res.status(200).json(yield order_business_service_1.OrderBusinessService.getAllOrders(user.role));
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getCurrent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, params: { id } } = req;
                res.status(200).json(yield order_business_service_1.OrderBusinessService.getCurrent(user.role, parseInt(id)));
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getOrderStatuses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = req;
                res.status(200).json(yield order_business_service_1.OrderBusinessService.getAllStatuses(user.role));
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.OrderController = OrderController;
