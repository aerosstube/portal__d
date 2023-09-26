import { vat_rates } from '../../../models/vat_rates';
import { Utils } from '../../utils/utils';
import { VatRatesDatabaseService } from './vat_rates.database.service';


export class VatRatesBusinessService {
    static async getAll(userRole: string): Promise<vat_rates[]> {
        Utils.checkRoleAccess(userRole);
        return await VatRatesDatabaseService.findAll();
    }
}