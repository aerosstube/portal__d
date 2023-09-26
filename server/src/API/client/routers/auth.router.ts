import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';


const authRouter: Router = Router();

authRouter
    .post('/login', AuthController.userLogin)
    // .post('/registration', AuthController.userRegistration)
    .delete('/logout', AuthController.userLogout)
    .get('/refresh', AuthController.userRefresh);

export { authRouter };