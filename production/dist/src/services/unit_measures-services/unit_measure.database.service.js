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
exports.UnitMeasureDatabaseService = void 0;
const init_models_1 = require("../../../models/init-models");
class UnitMeasureDatabaseService {
    static create(unitMeasureInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.unit_measures.create({
                name: unitMeasureInfo.name,
                full_name: unitMeasureInfo.fullName,
            }, { transaction });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return init_models_1.unit_measures.findOne({
                where: {
                    id: id,
                },
            });
        });
    }
    static findDuplicate(unitMeasureInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.unit_measures.findOne({
                where: {
                    name: unitMeasureInfo.name,
                    full_name: unitMeasureInfo.fullName,
                },
            });
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.unit_measures.findAll({
                order: [
                    ['id', 'ASC'],
                ],
            });
        });
    }
    static findAllMarkedDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.unit_measures.findAll({
                where: {
                    is_deleted: true,
                },
            });
        });
    }
}
exports.UnitMeasureDatabaseService = UnitMeasureDatabaseService;
