"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../../middlewares/auth-middleware");
const user_controller_1 = require("../controllers/user.controller");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter
    .put("/create", auth_middleware_1.AuthMiddleware, user_controller_1.UserController.create)
    .post("/change", auth_middleware_1.AuthMiddleware, user_controller_1.UserController.change)
    .get("/getAll", auth_middleware_1.AuthMiddleware, user_controller_1.UserController.getAll)
    .delete("/delete", auth_middleware_1.AuthMiddleware, user_controller_1.UserController.delete)
    .get("/roles/getAll", auth_middleware_1.AuthMiddleware, user_controller_1.UserController.getAllRoles);
