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
exports.UnitMeasureBusinessService = void 0;
const utils_1 = require("../../utils/utils");
const unit_measure_service_1 = require("./unit_measure.service");
const init_models_1 = require("../../../models/init-models");
const unit_measure_database_service_1 = require("./unit_measure.database.service");
class UnitMeasureBusinessService {
    static create(userRole, unitMeasureInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            utils_1.Utils.isDuplicate(yield unit_measure_service_1.UnitMeasureService.isDuplicate(unitMeasureInfo));
            yield unit_measure_service_1.UnitMeasureService.create(unitMeasureInfo, transaction);
        });
    }
    static update(userRole, unitMeasureInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            utils_1.Utils.isDuplicate(yield unit_measure_service_1.UnitMeasureService.isDuplicate(unitMeasureInfo));
            yield unit_measure_service_1.UnitMeasureService.update(unitMeasureInfo, transaction);
        });
    }
    static delete(unitMeasureId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const unitMeasure = yield unit_measure_service_1.UnitMeasureService.getById(unitMeasureId);
            const nomenclatures = yield init_models_1.nomenclature.findAll({
                where: {
                    unit_measure_id_fk: unitMeasureId,
                },
            });
            for (let i = 0; i < nomenclatures.length; i++) {
                nomenclatures[i].unit_measure_id_fk = null;
                yield nomenclatures[i].save({ transaction });
            }
            const product = yield init_models_1.products.findAll({
                where: {
                    unit_measure_id_fk: unitMeasureId,
                },
            });
            for (let i = 0; i < product.length; i++) {
                product[i].unit_measure_id_fk = null;
                yield product[i].save({ transaction });
            }
            yield unitMeasure.destroy({ transaction });
        });
    }
    static markDelete(userRole, id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            yield unit_measure_service_1.UnitMeasureService.delete(id, transaction);
        });
    }
    static getAll(userRole) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            return unit_measure_service_1.UnitMeasureService.createArrayDto(yield unit_measure_service_1.UnitMeasureService.getAll());
        });
    }
    static getCurrent(userRole, id) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            return unit_measure_service_1.UnitMeasureService.createDto(yield unit_measure_service_1.UnitMeasureService.getById(id));
        });
    }
    static getMarkedDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield unit_measure_service_1.UnitMeasureService.createArrayDto(yield unit_measure_database_service_1.UnitMeasureDatabaseService.findAllMarkedDeleted());
        });
    }
}
exports.UnitMeasureBusinessService = UnitMeasureBusinessService;
