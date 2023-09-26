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
exports.NomenclatureService = void 0;
const api_error_1 = require("../../errors/api.error");
const nomenclature_database_service_1 = require("./nomenclature.database.service");
const unit_measure_service_1 = require("../unit_measures-services/unit_measure.service");
class NomenclatureService {
    static create(nomenclatureInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield nomenclature_database_service_1.NomenclatureDatabaseService.create(nomenclatureInfo, transaction);
        });
    }
    static update(nomenclatureInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const nomenclature = yield this.getById(nomenclatureInfo.id);
            nomenclature.work_name = nomenclatureInfo.workName;
            nomenclature.full_name = nomenclatureInfo.fullName;
            nomenclature.unit_measure_id_fk = nomenclatureInfo.unit_measure_id_fk;
            nomenclature.external_id = nomenclatureInfo.externalId ? nomenclatureInfo.externalId : nomenclature.external_id;
            yield nomenclature.save({ transaction });
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const unitMeasure = yield nomenclature_database_service_1.NomenclatureDatabaseService.findById(id);
            if (!unitMeasure) {
                throw api_error_1.ApiError.BadRequest('Такой единицы измерения не существует!');
            }
            return unitMeasure;
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const unitMeasures = yield nomenclature_database_service_1.NomenclatureDatabaseService.findAll();
            if (unitMeasures.length === 0) {
                throw api_error_1.ApiError.BadRequest('Единиц измерения не существует!');
            }
            return unitMeasures;
        });
    }
    static isDuplicate(nomenclatureInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield nomenclature_database_service_1.NomenclatureDatabaseService.findDuplicate(nomenclatureInfo);
            return !!(orders);
        });
    }
    static createArrayDto(nomenclature) {
        return __awaiter(this, void 0, void 0, function* () {
            const nomenclatures = [];
            for (let i = 0; i < nomenclature.length; i++) {
                nomenclatures.push({
                    id: nomenclature[i].id,
                    fullName: nomenclature[i].full_name,
                    unit_measure: !nomenclature[i].unit_measure_id_fk ? null : yield unit_measure_service_1.UnitMeasureService.createDto(yield unit_measure_service_1.UnitMeasureService.getById(nomenclature[i].unit_measure_id_fk)),
                    workName: nomenclature[i].work_name,
                    isDeleted: nomenclature[i].is_deleted,
                });
            }
            return nomenclatures;
        });
    }
    static createDto(nomenclature) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                id: nomenclature.id,
                fullName: nomenclature.full_name,
                unit_measure: !nomenclature.unit_measure_id_fk ? null : yield unit_measure_service_1.UnitMeasureService.createDto(yield unit_measure_service_1.UnitMeasureService.getById(nomenclature.unit_measure_id_fk)),
                workName: nomenclature.work_name,
                isDeleted: nomenclature.is_deleted,
                externalId: nomenclature.external_id
            };
        });
    }
    static delete(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const nomenclature = yield this.getById(id);
            nomenclature.is_deleted = !nomenclature.is_deleted;
            yield nomenclature.save({ transaction });
        });
    }
}
exports.NomenclatureService = NomenclatureService;
