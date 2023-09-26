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
exports.NomenclatureBusinessService = void 0;
const utils_1 = require("../../utils/utils");
const nomenclature_service_1 = require("./nomenclature.service");
const product_database_service_1 = require("../product-services/product.database.service");
const nomenclature_database_service_1 = require("./nomenclature.database.service");
class NomenclatureBusinessService {
    static create(userRole, nomenclatureInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            utils_1.Utils.isDuplicate(yield nomenclature_service_1.NomenclatureService.isDuplicate(nomenclatureInfo));
            yield nomenclature_service_1.NomenclatureService.create(nomenclatureInfo, transaction);
        });
    }
    static delete(nomenclatureId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const nomenclature = yield nomenclature_service_1.NomenclatureService.getById(nomenclatureId);
            const products = yield product_database_service_1.ProductDatabaseService.findAllByNomenclatureId(nomenclatureId);
            for (let i = 0; i < products.length; i++) {
                products[i].nomenclature_id_fk = null;
                yield products[i].save({ transaction });
            }
            yield nomenclature.destroy({ transaction });
        });
    }
    static update(userRole, nomenclatureInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            utils_1.Utils.isDuplicate(yield nomenclature_service_1.NomenclatureService.isDuplicate(nomenclatureInfo));
            yield nomenclature_service_1.NomenclatureService.update(nomenclatureInfo, transaction);
        });
    }
    static markDelete(userRole, id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            yield nomenclature_service_1.NomenclatureService.delete(id, transaction);
        });
    }
    static getAll(userRole) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            return nomenclature_service_1.NomenclatureService.createArrayDto(yield nomenclature_service_1.NomenclatureService.getAll());
        });
    }
    static getCurrent(userRole, id) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            return nomenclature_service_1.NomenclatureService.createDto(yield nomenclature_service_1.NomenclatureService.getById(id));
        });
    }
    static getMarkedDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield nomenclature_service_1.NomenclatureService.createArrayDto(yield nomenclature_database_service_1.NomenclatureDatabaseService.findMarkedDeleted());
        });
    }
}
exports.NomenclatureBusinessService = NomenclatureBusinessService;
