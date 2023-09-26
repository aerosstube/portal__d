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
exports.ProductBusinessService = void 0;
const utils_1 = require("../../utils/utils");
const product_service_1 = require("./product.service");
class ProductBusinessService {
    static createProduct(userRole, productInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            if (yield product_service_1.ProductService.isDuplicate(productInfo)) {
                return;
            }
            yield product_service_1.ProductService.create(productInfo, transaction);
        });
    }
    static updateProduct(userRole, productInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            yield product_service_1.ProductService.update(productInfo, transaction);
        });
    }
    static getAllProducts(userRole, id) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            return yield product_service_1.ProductService.createArrayDto(yield product_service_1.ProductService.getAllByOrderId(id));
        });
    }
    static getCurrentProduct(userRole, id) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            return yield product_service_1.ProductService.createDto(yield product_service_1.ProductService.getByOrderId(id));
        });
    }
    static delete(userRole, id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            const product = yield product_service_1.ProductService.getById(id);
            yield product.destroy({ transaction });
        });
    }
}
exports.ProductBusinessService = ProductBusinessService;
