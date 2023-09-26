import { Router } from 'express';
import { AuthMiddleware } from '../../../middlewares/auth-middleware';
import { OrganizationController } from '../controllers/organization.controller';


const organizationRouter: Router = Router();

organizationRouter
    .put('/create', AuthMiddleware, OrganizationController.create)
    .post('/update', AuthMiddleware, OrganizationController.update)
    .delete('/delete', AuthMiddleware, OrganizationController.delete)
    .get('/getAll', AuthMiddleware, OrganizationController.getAll)
    .get('/get/:id', AuthMiddleware, OrganizationController.getCurrent);


export { organizationRouter };