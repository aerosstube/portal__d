import { Router } from 'express';
import { AuthMiddleware } from '../../../middlewares/auth-middleware';
import { OrderController } from '../controllers/order.controller';


const orderRouter: Router = Router();

orderRouter
    .put('/create', AuthMiddleware, OrderController.create)
    .post('/update', AuthMiddleware, OrderController.update)
    .delete('/delete', AuthMiddleware, OrderController.delete)
    .get('/getAll', AuthMiddleware, OrderController.getAll)
    .get('/get/:id', AuthMiddleware, OrderController.getCurrent)
    .get('/status/getAll', AuthMiddleware, OrderController.getOrderStatuses);


export { orderRouter };