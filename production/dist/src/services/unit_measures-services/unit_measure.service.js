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
exports.UnitMeasureService = void 0;
const api_error_1 = require("../../errors/api.error");
const unit_measure_database_service_1 = require("./unit_measure.database.service");
class UnitMeasureService {
    static create(unitMeasureInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield unit_measure_database_service_1.UnitMeasureDatabaseService.create(unitMeasureInfo, transaction);
        });
    }
    static update(unitMeasureInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const unitMeasure = yield this.getById(unitMeasureInfo.id);
            unitMeasure.name = unitMeasureInfo.name;
            unitMeasure.full_name = unitMeasureInfo.fullName;
            yield unitMeasure.save({ transaction });
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const unitMeasure = yield unit_measure_database_service_1.UnitMeasureDatabaseService.findById(id);
            if (!unitMeasure) {
                throw api_error_1.ApiError.BadRequest('Такой единицы измерения не существует!');
            }
            return unitMeasure;
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const unitMeasures = yield unit_measure_database_service_1.UnitMeasureDatabaseService.findAll();
            if (unitMeasures.length === 0) {
                throw api_error_1.ApiError.BadRequest('Единиц измерения не существует!');
            }
            return unitMeasures;
        });
    }
    static isDuplicate(unitMeasureInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield unit_measure_database_service_1.UnitMeasureDatabaseService.findDuplicate(unitMeasureInfo);
            return !!(orders);
        });
    }
    static createArrayDto(unit_measure) {
        return __awaiter(this, void 0, void 0, function* () {
            const unit_measures = [];
            for (let i = 0; i < unit_measure.length; i++) {
                unit_measures.push({
                    id: unit_measure[i].id,
                    fullName: unit_measure[i].full_name,
                    name: unit_measure[i].name,
                    isDeleted: unit_measure[i].is_deleted,
                });
            }
            return unit_measures;
        });
    }
    static createDto(unit_measure) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                id: unit_measure.id,
                fullName: unit_measure.full_name,
                name: unit_measure.name,
                isDeleted: unit_measure.is_deleted,
            };
        });
    }
    static delete(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const unitMeasure = yield this.getById(id);
            unitMeasure.is_deleted = !unitMeasure.is_deleted;
            yield unitMeasure.save({ transaction });
        });
    }
}
exports.UnitMeasureService = UnitMeasureService;
