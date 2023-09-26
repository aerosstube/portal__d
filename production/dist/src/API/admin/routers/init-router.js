"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouterApp = void 0;
const express_1 = require("express");
const client_router_1 = require("./client.router");
const counterparty_router_1 = require("./counterparty.router");
const organization_router_1 = require("./organization.router");
const order_router_1 = require("./order.router");
const nomenclature_router_1 = require("./nomenclature.router");
const unit_measure_router_1 = require("./unit_measure.router");
const user_router_1 = require("./user.router");
const adminRouterApp = (0, express_1.Router)();
exports.adminRouterApp = adminRouterApp;
adminRouterApp
    .use('/client', client_router_1.clientRouter)
    .use('/counterparty', counterparty_router_1.counterpartyRouter)
    .use('/organization', organization_router_1.organizationRouter)
    .use('/order', order_router_1.orderRouter)
    .use('/nomenclature', nomenclature_router_1.nomenclatureRouter)
    .use('/unitMeasure', unit_measure_router_1.unitMeasureRouter)
    .use('/user', user_router_1.userRouter);
