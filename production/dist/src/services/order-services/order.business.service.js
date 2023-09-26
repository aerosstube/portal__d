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
exports.OrderBusinessService = void 0;
const utils_1 = require("../../utils/utils");
const order_service_1 = require("./order.service");
const product_service_1 = require("../product-services/product.service");
const order_database_service_1 = require("./order.database.service");
class OrderBusinessService {
    static createOrder(user, orderInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(user.role);
            utils_1.Utils.isDuplicate(yield order_service_1.OrderService.isDuplicate(orderInfo));
            return yield order_service_1.OrderService.createOrder(orderInfo, transaction);
        });
    }
    static updateOrder(userRole, orderInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            yield order_service_1.OrderService.updateOrder(orderInfo, transaction);
        });
    }
    static delete(orderId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield order_service_1.OrderService.getById(orderId);
            const products = yield product_service_1.ProductService.getAllByOrderId(orderId);
            for (let i = 0; i < products.length; i++) {
                yield products[i].destroy({ transaction });
            }
            yield order.destroy({ transaction });
        });
    }
    static markDelete(userRole, id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            yield order_service_1.OrderService.markDelete(id, transaction);
        });
    }
    static getAllOrders(userRole) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            return yield order_service_1.OrderService.createArrayDto(yield order_service_1.OrderService.getAll());
        });
    }
    static getCurrent(userRole, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            return yield order_service_1.OrderService.createDto(yield order_service_1.OrderService.getById(orderId));
        });
    }
    static getAllStatuses(userRole) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            return yield order_service_1.OrderService.getAllStatuses();
        });
    }
    static getMarkedDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield order_service_1.OrderService.createArrayDto(yield order_database_service_1.OrderDatabaseService.getOrderBySomeId({
                where: {
                    is_deleted: true,
                },
            }));
        });
    }
}
exports.OrderBusinessService = OrderBusinessService;
