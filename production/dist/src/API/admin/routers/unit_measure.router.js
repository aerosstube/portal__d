"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitMeasureRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../../middlewares/auth-middleware");
const unit_measure_controller_1 = require("../controllers/unit_measure.controller");
const unitMeasureRouter = (0, express_1.Router)();
exports.unitMeasureRouter = unitMeasureRouter;
unitMeasureRouter
    .delete('/delete', auth_middleware_1.AuthMiddleware, unit_measure_controller_1.UnitMeasureController.delete)
    .get('/getMarkedDeleted', auth_middleware_1.AuthMiddleware, unit_measure_controller_1.UnitMeasureController.getMarkedDeleted);
