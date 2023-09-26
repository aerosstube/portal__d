import { Router } from 'express';
import { AuthMiddleware } from '../../../middlewares/auth-middleware';
import { OrganizationController } from '../controllers/organization.controller';


const organizationRouter: Router = Router();

organizationRouter
    .delete('/delete', AuthMiddleware, OrganizationController.delete)
    .get('/getMarkedDeleted', AuthMiddleware, OrganizationController.getMarkedDeleted);

export { organizationRouter };