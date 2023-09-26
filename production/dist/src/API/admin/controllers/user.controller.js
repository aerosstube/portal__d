"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_business_service_1 = require("../../../services/user-services/user.business.service");
const databasse_connect_1 = require("../../../services/databasse-connect");
class UserController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield databasse_connect_1.SequelizeConnect.transaction();
            try {
                const { body: { user }, } = req;
                yield user_business_service_1.UserBusinessService.create(user, transaction);
                res.status(200).json("Пользователь создан!");
                yield transaction.commit();
            }
            catch (err) {
                yield transaction.rollback();
                next(err);
            }
        });
    }
    static change(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield databasse_connect_1.SequelizeConnect.transaction();
            try {
                const { body: { user }, } = req;
                yield user_business_service_1.UserBusinessService.change(user, transaction);
                res.status(200).json("Пользователь изменен!");
                yield transaction.commit();
            }
            catch (err) {
                yield transaction.rollback();
                next(err);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield user_business_service_1.UserBusinessService.getAll());
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getAllRoles(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield user_business_service_1.UserBusinessService.getAllRoles());
            }
            catch (err) {
                next(err);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield databasse_connect_1.SequelizeConnect.transaction();
            try {
                const { query: { ids } } = req;
                if (typeof ids === 'string') {
                    for (const id of ids.split(',')) {
                        yield user_business_service_1.UserBusinessService.delete(parseInt(id), transaction);
                    }
                    res.json('Все успешно удалено!');
                }
                else {
                    res.status(400).json('Неверный Id!');
                }
                yield transaction.commit();
            }
            catch (err) {
                yield transaction.rollback();
                next(err);
            }
        });
    }
}
exports.UserController = UserController;
