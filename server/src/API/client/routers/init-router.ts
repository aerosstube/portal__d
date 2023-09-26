import { Router } from 'express';
import { authRouter } from './auth.router';
import { clientRouter } from './client.router';
import { counterpartyRouter } from './counterparty.router';
import { nomenclatureRouter } from './nomenclature.router';
import { orderRouter } from './order.router';
import { organizationRouter } from './organization.router';
import { productRouter } from './product.router';
import { unitMeasureRouter } from './unit_measure.router';
import { vatRatesRouter } from './vat_rates.router';


const routerApp: Router = Router();

routerApp
    .use('/auth', authRouter)
    .use('/client', clientRouter)
    .use('/counterparty', counterpartyRouter)
    .use('/organization', organizationRouter)
    .use('/order', orderRouter)
    .use('/product', productRouter)
    .use('/vat_rates', vatRatesRouter)
    .use('/unit_measure', unitMeasureRouter)
    .use('/nomenclature', nomenclatureRouter);

export { routerApp };
