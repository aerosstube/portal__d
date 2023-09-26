import { Router } from 'express';
import { AuthMiddleware } from '../../../middlewares/auth-middleware';
import { UnitMeasureController } from '../controllers/unit_measure.controller';


const unitMeasureRouter: Router = Router();

unitMeasureRouter
    .delete('/delete', AuthMiddleware, UnitMeasureController.delete)
    .get('/getMarkedDeleted', AuthMiddleware, UnitMeasureController.getMarkedDeleted);

export { unitMeasureRouter };