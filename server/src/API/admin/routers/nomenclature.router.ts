import { Router } from 'express';
import { AuthMiddleware } from '../../../middlewares/auth-middleware';
import { NomenclatureController } from '../controllers/nomenclature.controller';


const nomenclatureRouter: Router = Router();

nomenclatureRouter
    .delete('/delete', AuthMiddleware, NomenclatureController.delete)
    .get('/getMarkedDeleted', AuthMiddleware, NomenclatureController.getMarkedDeleted);

export { nomenclatureRouter };