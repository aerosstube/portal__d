"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../../middlewares/auth-middleware");
const order_controller_1 = require("../controllers/order.controller");
const orderRouter = (0, express_1.Router)();
exports.orderRouter = orderRouter;
orderRouter
    .put('/create', auth_middleware_1.AuthMiddleware, order_controller_1.OrderController.create)
    .post('/update', auth_middleware_1.AuthMiddleware, order_controller_1.OrderController.update)
    .delete('/delete', auth_middleware_1.AuthMiddleware, order_controller_1.OrderController.delete)
    .get('/getAll', auth_middleware_1.AuthMiddleware, order_controller_1.OrderController.getAll)
    .get('/get/:id', auth_middleware_1.AuthMiddleware, order_controller_1.OrderController.getCurrent)
    .get('/status/getAll', auth_middleware_1.AuthMiddleware, order_controller_1.OrderController.getOrderStatuses);
