import { Router } from 'express';
import { AuthMiddleware } from '../../../middlewares/auth-middleware';
import { ProductController } from '../controllers/product.controller';


const productRouter: Router = Router();

productRouter
    .put('/create', AuthMiddleware, ProductController.create)
    .post('/update', AuthMiddleware, ProductController.update)
    .delete('/delete', AuthMiddleware, ProductController.delete)
    .get('/getAll', AuthMiddleware, ProductController.getAll)
    .get('/get/:id', AuthMiddleware, ProductController.getCurrent)
    .post('/create_or_update', AuthMiddleware, ProductController.createOrUpdate)


export { productRouter };
