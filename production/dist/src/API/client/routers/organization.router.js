"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../../middlewares/auth-middleware");
const organization_controller_1 = require("../controllers/organization.controller");
const organizationRouter = (0, express_1.Router)();
exports.organizationRouter = organizationRouter;
organizationRouter
    .put('/create', auth_middleware_1.AuthMiddleware, organization_controller_1.OrganizationController.create)
    .post('/update', auth_middleware_1.AuthMiddleware, organization_controller_1.OrganizationController.update)
    .delete('/delete', auth_middleware_1.AuthMiddleware, organization_controller_1.OrganizationController.delete)
    .get('/getAll', auth_middleware_1.AuthMiddleware, organization_controller_1.OrganizationController.getAll)
    .get('/get/:id', auth_middleware_1.AuthMiddleware, organization_controller_1.OrganizationController.getCurrent);
