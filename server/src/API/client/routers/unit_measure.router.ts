import { Router } from 'express';
import { AuthMiddleware } from '../../../middlewares/auth-middleware';
import { UnitMeasureController } from '../controllers/unit_measure.controller';


const unitMeasureRouter: Router = Router();

unitMeasureRouter
    .post('/update', AuthMiddleware, UnitMeasureController.update)
    .put('/create', AuthMiddleware, UnitMeasureController.create)
    .delete('/delete', AuthMiddleware, UnitMeasureController.delete)
    .get('/getAll', AuthMiddleware, UnitMeasureController.getAll)
    .get('/get/:id', AuthMiddleware, UnitMeasureController.getCurrent);

export { unitMeasureRouter };