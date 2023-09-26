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
exports.VatRatesBusinessService = void 0;
const utils_1 = require("../../utils/utils");
const vat_rates_database_service_1 = require("./vat_rates.database.service");
class VatRatesBusinessService {
    static getAll(userRole) {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.Utils.checkRoleAccess(userRole);
            return yield vat_rates_database_service_1.VatRatesDatabaseService.findAll();
        });
    }
}
exports.VatRatesBusinessService = VatRatesBusinessService;
