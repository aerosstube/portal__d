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
exports.NomenclatureDatabaseService = void 0;
const init_models_1 = require("../../../models/init-models");
const crypto_1 = require("crypto");
class NomenclatureDatabaseService {
    static create(nomenclatureInfo, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.nomenclature.create({
                external_id: nomenclatureInfo.externalId ? nomenclatureInfo.externalId : String((0, crypto_1.randomInt)(1, 100000)),
                work_name: nomenclatureInfo.workName,
                full_name: nomenclatureInfo.fullName,
                unit_measure_id_fk: nomenclatureInfo.unit_measure_id_fk,
            }, { transaction });
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return init_models_1.nomenclature.findOne({
                where: {
                    id: id,
                },
            });
        });
    }
    static findDuplicate(nomenclatureInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.nomenclature.findOne({
                where: {
                    work_name: nomenclatureInfo.workName,
                    full_name: nomenclatureInfo.fullName,
                    unit_measure_id_fk: nomenclatureInfo.unit_measure_id_fk,
                },
            });
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.nomenclature.findAll({
                order: [
                    ['id', 'ASC'],
                ],
            });
        });
    }
    static findMarkedDeleted() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield init_models_1.nomenclature.findAll({
                where: {
                    is_deleted: true,
                },
            });
        });
    }
}
exports.NomenclatureDatabaseService = NomenclatureDatabaseService;
