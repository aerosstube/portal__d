import { Router } from 'express';
import { AuthMiddleware } from '../../../middlewares/auth-middleware';
import { NomenclatureController } from '../controllers/nomenclature.controller';


const nomenclatureRouter: Router = Router();

nomenclatureRouter
    .post('/update', AuthMiddleware, NomenclatureController.update)
    .put('/create', AuthMiddleware, NomenclatureController.create)
    .delete('/delete', AuthMiddleware, NomenclatureController.delete)
    .get('/getAll', AuthMiddleware, NomenclatureController.getAll)
    .get('/get/:id', AuthMiddleware, NomenclatureController.getCurrent);

export { nomenclatureRouter };