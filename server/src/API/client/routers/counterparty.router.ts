import { Router } from 'express';
import { AuthMiddleware } from '../../../middlewares/auth-middleware';
import { CounterpartyController } from '../controllers/counterparty.controller';


const counterpartyRouter: Router = Router();

counterpartyRouter
    .put('/create', AuthMiddleware, CounterpartyController.create)
    .post('/update', AuthMiddleware, CounterpartyController.update)
    .delete('/delete', AuthMiddleware, CounterpartyController.delete)
    .get('/getTypes', AuthMiddleware, CounterpartyController.getCounterpartyTypes)
    .get('/getList', AuthMiddleware, CounterpartyController.getAll)
    .get('/get/:id', AuthMiddleware, CounterpartyController.getCurrent);


export { counterpartyRouter };