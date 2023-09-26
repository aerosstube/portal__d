import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/api.error';
import { AuthUser, TokenOptions } from '../services/auth-services/auth.business.service';
import { AuthService } from '../services/auth-services/auth.service';


export interface RequestWithUser extends Request {
    user: AuthUser;
}

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader)
            return next(ApiError.UnauthorizedError());

        const accessToken: string = authorizationHeader.split(' ')[1];
        if (!accessToken)
            return next(ApiError.UnauthorizedError());

        const verifyToken: TokenOptions = await AuthService.validateAccessToken(accessToken);
        const isAccess: boolean = verifyToken.role === 'Администратор';
        if (req.baseUrl.includes('admin') && !isAccess)
            return next(ApiError.AccessDenied());

        req.user = {
            login: verifyToken.login,
            userId: verifyToken.userId,
            fullName: verifyToken.fullName,
            role: verifyToken.role,
        };
        next();
    } catch (err) {
        return next(err);
    }
};
