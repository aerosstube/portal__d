import { Router } from 'express';
import { AuthMiddleware } from '../../../middlewares/auth-middleware';
import { ClientController } from '../controllers/client.controller';


const clientRouter: Router = Router();

clientRouter
    .delete('/delete', AuthMiddleware, ClientController.delete)
    .get('/getMarkedDeleted', AuthMiddleware, ClientController.getMarkedDeleted);

export { clientRouter };