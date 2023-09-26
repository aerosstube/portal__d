"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerApp = void 0;
const express_1 = require("express");
const auth_router_1 = require("./auth.router");
const client_router_1 = require("./client.router");
const counterparty_router_1 = require("./counterparty.router");
const nomenclature_router_1 = require("./nomenclature.router");
const order_router_1 = require("./order.router");
const organization_router_1 = require("./organization.router");
const product_router_1 = require("./product.router");
const unit_measure_router_1 = require("./unit_measure.router");
const vat_rates_router_1 = require("./vat_rates.router");
const routerApp = (0, express_1.Router)();
exports.routerApp = routerApp;
routerApp
    .use('/auth', auth_router_1.authRouter)
    .use('/client', client_router_1.clientRouter)
    .use('/counterparty', counterparty_router_1.counterpartyRouter)
    .use('/organization', organization_router_1.organizationRouter)
    .use('/order', order_router_1.orderRouter)
    .use('/product', product_router_1.productRouter)
    .use('/vat_rates', vat_rates_router_1.vatRatesRouter)
    .use('/unit_measure', unit_measure_router_1.unitMeasureRouter)
    .use('/nomenclature', nomenclature_router_1.nomenclatureRouter);
