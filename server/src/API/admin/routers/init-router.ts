import { Router } from 'express';
import { clientRouter } from './client.router';
import { counterpartyRouter } from './counterparty.router';
import { organizationRouter } from './organization.router';
import { orderRouter } from './order.router';
import { nomenclatureRouter } from './nomenclature.router';
import { unitMeasureRouter } from './unit_measure.router';
import { userRouter } from './user.router';


const adminRouterApp: Router = Router();

adminRouterApp
    .use('/client', clientRouter)
    .use('/counterparty', counterpartyRouter)
    .use('/organization', organizationRouter)
    .use('/order', orderRouter)
    .use('/nomenclature', nomenclatureRouter)
    .use('/unitMeasure', unitMeasureRouter)
    .use('/user', userRouter);

export { adminRouterApp };