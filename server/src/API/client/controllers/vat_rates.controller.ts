import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../../../middlewares/auth-middleware';
import { VatRatesBusinessService } from '../../../services/vat_rates-service/vat_rates.business.service';


export class VatRatesController {
    static async getAll(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { user } = req;
            const vatRates = await VatRatesBusinessService.getAll(user.role);
            res.json({ vatRates });
        } catch (err) {
            next(err);
        }
    }
}