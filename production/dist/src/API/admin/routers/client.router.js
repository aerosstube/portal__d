"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../../middlewares/auth-middleware");
const client_controller_1 = require("../controllers/client.controller");
const clientRouter = (0, express_1.Router)();
exports.clientRouter = clientRouter;
clientRouter
    .delete('/delete', auth_middleware_1.AuthMiddleware, client_controller_1.ClientController.delete)
    .get('/getMarkedDeleted', auth_middleware_1.AuthMiddleware, client_controller_1.ClientController.getMarkedDeleted);
