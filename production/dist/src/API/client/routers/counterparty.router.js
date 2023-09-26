"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.counterpartyRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../../middlewares/auth-middleware");
const counterparty_controller_1 = require("../controllers/counterparty.controller");
const counterpartyRouter = (0, express_1.Router)();
exports.counterpartyRouter = counterpartyRouter;
counterpartyRouter
    .put('/create', auth_middleware_1.AuthMiddleware, counterparty_controller_1.CounterpartyController.create)
    .post('/update', auth_middleware_1.AuthMiddleware, counterparty_controller_1.CounterpartyController.update)
    .delete('/delete', auth_middleware_1.AuthMiddleware, counterparty_controller_1.CounterpartyController.delete)
    .get('/getTypes', auth_middleware_1.AuthMiddleware, counterparty_controller_1.CounterpartyController.getCounterpartyTypes)
    .get('/getList', auth_middleware_1.AuthMiddleware, counterparty_controller_1.CounterpartyController.getAll)
    .get('/get/:id', auth_middleware_1.AuthMiddleware, counterparty_controller_1.CounterpartyController.getCurrent);
