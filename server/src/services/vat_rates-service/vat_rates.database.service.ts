import { vat_rates } from '../../../models/vat_rates';


export class VatRatesDatabaseService {
    static async findAll() {
        return await vat_rates.findAll({
            order: [
                ['rate', 'ASC'],
            ],
        });
    }

    static async findById(id: number) {
        return await vat_rates.findOne({
            where: {
                id: id,
            },
        });

    }
}