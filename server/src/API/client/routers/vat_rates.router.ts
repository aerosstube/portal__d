import { Router } from 'express';
import { AuthMiddleware } from '../../../middlewares/auth-middleware';
import { VatRatesController } from '../controllers/vat_rates.controller';


const vatRatesRouter: Router = Router();

vatRatesRouter
    .get('/getAll', AuthMiddleware, VatRatesController.getAll);

export { vatRatesRouter };