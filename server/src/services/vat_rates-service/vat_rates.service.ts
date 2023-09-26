import { vat_rates } from '../../../models/vat_rates';
import { VatRatesDatabaseService } from './vat_rates.database.service';
import { ApiError } from '../../errors/api.error';


export class VatRatesService {
    static async getById(id: number): Promise<vat_rates> {
        const vat_rate = await VatRatesDatabaseService.findById(id);
        if (!vat_rate) {
            throw ApiError.BadRequest('Неверный id vat_rate!');
        }

        return vat_rate;
    }
}