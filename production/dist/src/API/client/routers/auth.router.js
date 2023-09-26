"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter
    .post('/login', auth_controller_1.AuthController.userLogin)
    // .post('/registration', AuthController.userRegistration)
    .delete('/logout', auth_controller_1.AuthController.userLogout)
    .get('/refresh', auth_controller_1.AuthController.userRefresh);
