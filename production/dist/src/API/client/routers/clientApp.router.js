"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientAppRouter = void 0;
const express_1 = require("express");
const clientApp_controller_1 = require("../controllers/clientApp.controller");
const clientAppRouter = (0, express_1.Router)();
exports.clientAppRouter = clientAppRouter;
clientAppRouter
    .get('*', clientApp_controller_1.ClientAppController.getReactApp);
