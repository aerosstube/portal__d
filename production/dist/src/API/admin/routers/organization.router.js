"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../../middlewares/auth-middleware");
const organization_controller_1 = require("../controllers/organization.controller");
const organizationRouter = (0, express_1.Router)();
exports.organizationRouter = organizationRouter;
organizationRouter
    .delete('/delete', auth_middleware_1.AuthMiddleware, organization_controller_1.OrganizationController.delete)
    .get('/getMarkedDeleted', auth_middleware_1.AuthMiddleware, organization_controller_1.OrganizationController.getMarkedDeleted);
