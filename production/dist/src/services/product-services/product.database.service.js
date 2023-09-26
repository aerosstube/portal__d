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
exports.ProductDatabaseService = void 0;
const products_1 = require("../../../models/products");
class ProductDatabaseService {
    static create(productInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield products_1.products.create({
                vat_total: productInfo.vatTotal,
                nomenclature_id_fk: productInfo.nomenclature_id_fk,
                unit_measure_id_fk: productInfo.unit_measure_id_fk,
                vat_rate_id_fk: productInfo.vat_rate_id_fk,
                order_id_fk: productInfo.order_id_fk,
                amount: productInfo.amount,
                cost: productInfo.cost,
                total: productInfo.total,
                sale: productInfo.sale,
                total_sum: productInfo.totalSum,
            }, { transaction });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield products_1.products.findOne({
                where: {
                    id: id,
                },
            });
        });
    }
    static findDuplicate(productInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield products_1.products.findOne({
                where: {
                    nomenclature_id_fk: productInfo.nomenclature_id_fk,
                    order_id_fk: productInfo.order_id_fk,
                    unit_measure_id_fk: productInfo.unit_measure_id_fk,
                    vat_rate_id_fk: productInfo.vat_rate_id_fk,
                    amount: productInfo.amount,
                    cost: productInfo.cost,
                    total: productInfo.total,
                    sale: productInfo.sale,
                    total_sum: productInfo.totalSum,
                    vat_total: productInfo.vatTotal,
                },
            });
        });
    }
    static findAllByOrderId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield products_1.products.findAll({
                where: {
                    order_id_fk: id,
                },
                order: [
                    ['id', 'ASC'],
                ],
            });
        });
    }
    static findByOrderId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield products_1.products.findOne({
                where: {
                    order_id_fk: id,
                },
            });
        });
    }
    static findAllByNomenclatureId(nomenclatureId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield products_1.products.findAll({
                where: {
                    nomenclature_id_fk: nomenclatureId,
                },
            });
        });
    }
}
exports.ProductDatabaseService = ProductDatabaseService;
