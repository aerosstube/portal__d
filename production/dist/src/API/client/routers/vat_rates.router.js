"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vatRatesRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../../middlewares/auth-middleware");
const vat_rates_controller_1 = require("../controllers/vat_rates.controller");
const vatRatesRouter = (0, express_1.Router)();
exports.vatRatesRouter = vatRatesRouter;
vatRatesRouter
    .get('/getAll', auth_middleware_1.AuthMiddleware, vat_rates_controller_1.VatRatesController.getAll);
