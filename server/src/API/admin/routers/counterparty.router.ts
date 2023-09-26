import { Router } from 'express';
import { AuthMiddleware } from '../../../middlewares/auth-middleware';
import { CounterpartyController } from '../controllers/counterparty.controller';


const counterpartyRouter: Router = Router();

counterpartyRouter
    .delete('/delete', AuthMiddleware, CounterpartyController.delete)
    .get('/getMarkedDeleted', AuthMiddleware, CounterpartyController.getMarkedDeleted);

export { counterpartyRouter };