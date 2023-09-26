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
exports.NomenclatureController = void 0;
const databasse_connect_1 = require("../../../services/databasse-connect");
const nomenclature_business_service_1 = require("../../../services/nomenclature-services/nomenclature.business.service");
class NomenclatureController {
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield databasse_connect_1.SequelizeConnect.transaction();
            try {
                const { query: { ids } } = req;
                if (typeof ids === 'string') {
                    for (const id of ids.split(',')) {
                        yield nomenclature_business_service_1.NomenclatureBusinessService.delete(parseInt(id), transaction);
                    }
                    res.status(200).json('Успешно удалено!');
                }
                else {
                    res.status(401).json('Ошибка удаления!');
                }
                yield transaction.commit();
            }
            catch (err) {
                yield transaction.rollback();
                next(err);
            }
        });
    }
    static getMarkedDeleted(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield nomenclature_business_service_1.NomenclatureBusinessService.getMarkedDeleted());
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.NomenclatureController = NomenclatureController;