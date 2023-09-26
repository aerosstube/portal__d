import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../../errors/api.error';
import { AuthBusinessService, AuthOptions } from '../../../services/auth-services/auth.business.service';
import { JwtTokens } from '../../../services/auth-services/auth.service';
import { SequelizeConnect } from '../../../services/databasse-connect';


export class AuthController {
    static async userLogin(req: Request, res: Response, next: NextFunction) {
        const { body: { user }, socket, cookies: { refreshToken } } = req;

        if (refreshToken) {
            return next(ApiError.BadRequest('Вы авторизованы!'));
        }

        const deviceIp = socket.remoteAddress;
        const authOptions: AuthOptions = {
            deviceIp,
            userAgent: JSON.stringify(req.useragent),
            password: user.password,
            login: user.login,
            role: user.role,
        };

        const transaction = await SequelizeConnect.transaction();
        try {
            const tokens: JwtTokens = await AuthBusinessService.userLogin(authOptions, transaction);
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true });
            res.json({
                tokens,
            });
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            next(err);
        }

    }


    static async userLogout(req: Request, res: Response, next: NextFunction) {
        const transaction = await SequelizeConnect.transaction();
        try {
            const { cookies: { refreshToken } } = req;
            await AuthBusinessService.userLogout(refreshToken, transaction);
            res.clearCookie('refreshToken');
            await transaction.commit();
            res.json('Все удалено!');
        } catch (err) {
            await transaction.rollback();
            next(err);
        }
    }

    static async userRefresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { cookies: { refreshToken } } = req;

            const tokens: JwtTokens = await AuthBusinessService.userRefresh(refreshToken);
            res.json({
                tokens: tokens,
            });
        } catch (err) {
            next(err);
        }
    }
}
