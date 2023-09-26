import { Router } from 'express';
import { AuthMiddleware } from '../../../middlewares/auth-middleware';
import { OrderController } from '../controllers/order.contoller';


const orderRouter: Router = Router();

orderRouter
    .delete('/delete', AuthMiddleware, OrderController.delete)
    .get('/getMarkedDeleted', AuthMiddleware, OrderController.getMarkedDeleted);

export { orderRouter };