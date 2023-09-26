"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../../middlewares/auth-middleware");
const product_controller_1 = require("../controllers/product.controller");
const productRouter = (0, express_1.Router)();
exports.productRouter = productRouter;
productRouter
    .put('/create', auth_middleware_1.AuthMiddleware, product_controller_1.ProductController.create)
    .post('/update', auth_middleware_1.AuthMiddleware, product_controller_1.ProductController.update)
    .delete('/delete', auth_middleware_1.AuthMiddleware, product_controller_1.ProductController.delete)
    .get('/getAll', auth_middleware_1.AuthMiddleware, product_controller_1.ProductController.getAll)
    .get('/get/:id', auth_middleware_1.AuthMiddleware, product_controller_1.ProductController.getCurrent)
    .post('/create_or_update', auth_middleware_1.AuthMiddleware, product_controller_1.ProductController.createOrUpdate);
