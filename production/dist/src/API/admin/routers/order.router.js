"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../../middlewares/auth-middleware");
const order_contoller_1 = require("../controllers/order.contoller");
const orderRouter = (0, express_1.Router)();
exports.orderRouter = orderRouter;
orderRouter
    .delete('/delete', auth_middleware_1.AuthMiddleware, order_contoller_1.OrderController.delete)
    .get('/getMarkedDeleted', auth_middleware_1.AuthMiddleware, order_contoller_1.OrderController.getMarkedDeleted);
