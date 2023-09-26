import { Router } from 'express';
import { AuthMiddleware } from '../../../middlewares/auth-middleware';
import { ClientController } from '../controllers/client.controller';


const clientRouter: Router = Router();

clientRouter
    .put('/create', AuthMiddleware, ClientController.create)
    .post('/update', AuthMiddleware, ClientController.update)
    .delete('/delete', AuthMiddleware, ClientController.delete)
    .get('/getAll', AuthMiddleware, ClientController.getAll)
    .get('/get/:id', AuthMiddleware, ClientController.getCurrent);

export { clientRouter };