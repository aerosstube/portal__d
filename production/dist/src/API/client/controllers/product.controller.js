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
exports.ProductController = void 0;
const databasse_connect_1 = require("../../../services/databasse-connect");
const product_business_service_1 = require("../../../services/product-services/product.business.service");
class ProductController {
    static createOrUpdate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield databasse_connect_1.SequelizeConnect.transaction();
            try {
                const { body: { productInfo }, user } = req;
                for (const product of productInfo) {
                    if (product.id) {
                        yield product_business_service_1.ProductBusinessService.updateProduct(user.role, product, transaction);
                    }
                    else {
                        yield product_business_service_1.ProductBusinessService.createProduct(user.role, product, transaction);
                    }
                }
                res.json('все успешно создано!');
                yield transaction.commit();
            }
            catch (err) {
                yield transaction.rollback();
                next(err);
            }
        });
    }
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield databasse_connect_1.SequelizeConnect.transaction();
            try {
                const { body: { productInfo }, user } = req;
                for (const product of productInfo) {
                    yield product_business_service_1.ProductBusinessService.createProduct(user.role, product, transaction);
                }
                res.status(200).json('Товар успешно создан!');
                yield transaction.commit();
            }
            catch (err) {
                yield transaction.rollback();
                next(err);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield databasse_connect_1.SequelizeConnect.transaction();
            try {
                const { body: { productInfo }, user } = req;
                for (const product of productInfo) {
                    yield product_business_service_1.ProductBusinessService.updateProduct(user.role, productInfo, transaction);
                }
                res.status(200).json('Товар успешно изменен!');
                yield transaction.commit();
            }
            catch (err) {
                yield transaction.rollback();
                next(err);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield databasse_connect_1.SequelizeConnect.transaction();
            try {
                const { query: { ids }, user } = req;
                if (typeof ids === 'string') {
                    for (const id of ids.split(',')) {
                        yield product_business_service_1.ProductBusinessService.delete(user.role, parseInt(id), transaction);
                    }
                    res.json('Успешно удалено!');
                }
                else {
                    res.status(400).json('Ошибка удаления!');
                }
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
                const { user, query: { id } } = req;
                if (typeof id === 'string') {
                    res.status(200).json(yield product_business_service_1.ProductBusinessService.getAllProducts(user.role, parseInt(id)));
                }
                res.status(401).json('Неверный id заказа!');
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getCurrent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, params: { id } } = req;
                res.status(200).json(yield product_business_service_1.ProductBusinessService.getCurrentProduct(user.role, parseInt(id)));
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.ProductController = ProductController;
