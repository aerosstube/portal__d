"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nomenclatureRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../../middlewares/auth-middleware");
const nomenclature_controller_1 = require("../controllers/nomenclature.controller");
const nomenclatureRouter = (0, express_1.Router)();
exports.nomenclatureRouter = nomenclatureRouter;
nomenclatureRouter
    .post('/update', auth_middleware_1.AuthMiddleware, nomenclature_controller_1.NomenclatureController.update)
    .put('/create', auth_middleware_1.AuthMiddleware, nomenclature_controller_1.NomenclatureController.create)
    .delete('/delete', auth_middleware_1.AuthMiddleware, nomenclature_controller_1.NomenclatureController.delete)
    .get('/getAll', auth_middleware_1.AuthMiddleware, nomenclature_controller_1.NomenclatureController.getAll)
    .get('/get/:id', auth_middleware_1.AuthMiddleware, nomenclature_controller_1.NomenclatureController.getCurrent);
