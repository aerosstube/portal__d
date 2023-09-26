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
exports.UserService = void 0;
const users_1 = require("../../../models/users");
const api_error_1 = require("../../errors/api.error");
const user_database_service_1 = require("./user.database.service");
const user_roles_1 = require("../../../models/user_roles");
class UserService {
    static findByLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_database_service_1.UserDatabaseService.findUserByLogin(login);
            if (!user)
                throw api_error_1.ApiError.BadRequest('Ошибка пользователя!');
            return user;
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield users_1.users.findAll({ raw: true });
        });
    }
    static createArrayDto(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = [];
            for (let i = 0; i < user.length; i++) {
                users.push({
                    id: user[i].id,
                    email: user[i].email,
                    externalId: user[i].external_id,
                    fullName: user[i].full_name,
                    login: user[i].login,
                    password: user[i].password,
                    user_role_id_fk: (yield user_roles_1.user_roles.findOne({ where: { id: user[i].user_role_id_fk } })) ? yield user_roles_1.user_roles.findOne({ where: { id: user[i].user_role_id_fk } }) : null,
                });
            }
            return users;
        });
    }
    static createDto(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                id: user.id,
                email: user.email,
                externalId: user.external_id,
                fullName: user.full_name,
                login: user.login,
                password: user.password,
                user_role_id_fk: (yield user_roles_1.user_roles.findOne({ where: { id: user.user_role_id_fk } })) ? yield user_roles_1.user_roles.findOne({ where: { id: user.user_role_id_fk } }) : null,
            };
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_database_service_1.UserDatabaseService.findById(id);
            if (!user)
                throw api_error_1.ApiError.BadRequest('Ошибка пользователя!');
            return user;
        });
    }
}
exports.UserService = UserService;
