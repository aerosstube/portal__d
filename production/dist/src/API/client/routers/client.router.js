"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../../middlewares/auth-middleware");
const client_controller_1 = require("../controllers/client.controller");
const clientRouter = (0, express_1.Router)();
exports.clientRouter = clientRouter;
clientRouter
    .put('/create', auth_middleware_1.AuthMiddleware, client_controller_1.ClientController.create)
    .post('/update', auth_middleware_1.AuthMiddleware, client_controller_1.ClientController.update)
    .delete('/delete', auth_middleware_1.AuthMiddleware, client_controller_1.ClientController.delete)
    .get('/getAll', auth_middleware_1.AuthMiddleware, client_controller_1.ClientController.getAll)
    .get('/get/:id', auth_middleware_1.AuthMiddleware, client_controller_1.ClientController.getCurrent);
