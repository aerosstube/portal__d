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
exports.ProductService = void 0;
const api_error_1 = require("../../errors/api.error");
const product_database_service_1 = require("./product.database.service");
const vat_rates_service_1 = require("../vat_rates-service/vat_rates.service");
const unit_measure_service_1 = require("../unit_measures-services/unit_measure.service");
const order_service_1 = require("../order-services/order.service");
const nomenclature_service_1 = require("../nomenclature-services/nomenclature.service");
class ProductService {
    static create(productInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield product_database_service_1.ProductDatabaseService.create(productInfo, transaction);
        });
    }
    static update(productInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.getById(productInfo.id);
            product.amount = productInfo.amount;
            product.cost = productInfo.cost;
            product.id = productInfo.id;
            product.nomenclature_id_fk = productInfo.nomenclature_id_fk;
            product.order_id_fk = productInfo.order_id_fk;
            product.sale = productInfo.sale;
            product.total = productInfo.total;
            product.total_sum = productInfo.totalSum;
            product.unit_measure_id_fk = productInfo.unit_measure_id_fk;
            product.vat_total = productInfo.vatTotal;
            product.vat_rate_id_fk = productInfo.vat_rate_id_fk;
            yield product.save({ transaction });
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_database_service_1.ProductDatabaseService.findById(id);
            if (!product) {
                throw api_error_1.ApiError.BadRequest('Такого товара не существует!');
            }
            return product;
        });
    }
    static getByOrderId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_database_service_1.ProductDatabaseService.findByOrderId(id);
            if (!product) {
                throw api_error_1.ApiError.BadRequest('Такого товара не существует!');
            }
            return product;
        });
    }
    static getAllByOrderId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_database_service_1.ProductDatabaseService.findAllByOrderId(id);
        });
    }
    static isDuplicate(productInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_database_service_1.ProductDatabaseService.findDuplicate(productInfo);
            return !!(product);
        });
    }
    static createArrayDto(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = [];
            for (let i = 0; i < product.length; i++) {
                products.push({
                    id: product[i].id,
                    amount: product[i].amount,
                    cost: product[i].cost,
                    nomenclature: !product[i].nomenclature_id_fk ? null : yield nomenclature_service_1.NomenclatureService.createDto(yield nomenclature_service_1.NomenclatureService.getById(product[i].nomenclature_id_fk)),
                    order: !product[i].order_id_fk ? null : yield order_service_1.OrderService.createDto(yield order_service_1.OrderService.getById(product[i].order_id_fk)),
                    sale: product[i].sale,
                    total: product[i].total,
                    totalSum: product[i].total_sum,
                    unit_measure: !product[i].unit_measure_id_fk ? null : yield unit_measure_service_1.UnitMeasureService.createDto(yield unit_measure_service_1.UnitMeasureService.getById(product[i].unit_measure_id_fk)),
                    vatTotal: product[i].vat_total,
                    vat_rate: yield vat_rates_service_1.VatRatesService.getById(product[i].vat_rate_id_fk),
                });
            }
            return products;
        });
    }
    static createDto(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                id: product.id,
                amount: product.amount,
                cost: product.cost,
                nomenclature: !product.nomenclature_id_fk ? null : yield nomenclature_service_1.NomenclatureService.createDto(yield nomenclature_service_1.NomenclatureService.getById(product.nomenclature_id_fk)),
                order: !product.order_id_fk ? null : yield order_service_1.OrderService.createDto(yield order_service_1.OrderService.getById(product.order_id_fk)),
                sale: product.sale,
                total: product.total,
                totalSum: product.total_sum,
                unit_measure: !product.unit_measure_id_fk ? null : yield unit_measure_service_1.UnitMeasureService.createDto(yield unit_measure_service_1.UnitMeasureService.getById(product.unit_measure_id_fk)),
                vatTotal: product.vat_total,
                vat_rate: yield vat_rates_service_1.VatRatesService.getById(product.vat_rate_id_fk),
            };
        });
    }
}
exports.ProductService = ProductService;
