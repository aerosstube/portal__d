"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.app = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const UserAgent = __importStar(require("express-useragent"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config/config");
const init_models_1 = require("../models/init-models");
const init_router_1 = require("./API/client/routers/init-router");
const error_middleware_1 = require("./middlewares/error-middleware");
const databasse_connect_1 = require("./services/databasse-connect");
const init_router_2 = require("./API/admin/routers/init-router");
const clientApp_router_1 = require("./API/client/routers/clientApp.router");
exports.app = (0, express_1.default)();
const run = () => __awaiter(void 0, void 0, void 0, function*() {
    (0, init_models_1.initModels)(databasse_connect_1.SequelizeConnect);
    exports.app
        .use(UserAgent.express())
        .use((0, cors_1.default)())
        .use(body_parser_1.default.json())
        .use((0, cookie_parser_1.default)())
        .use(express_1.default.json())
        .use('/api', init_router_1.routerApp)
        .use('/api/admin', init_router_2.adminRouterApp)
        .use(express_1.default.static(path_1.default.join(__dirname, '../../public')))
        .use(express_1.default.static(path_1.default.join(__dirname, '../../public/app')))
        .use('/', clientApp_router_1.clientAppRouter)
        .use(error_middleware_1.ErrorMiddleware)
        .listen(config_1.application.port, () => {
            console.log(`Server listening on port = ${config_1.application.port}`);
        });
});
exports.run = run;
