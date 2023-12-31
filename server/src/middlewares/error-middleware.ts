import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors/api.error';


export const ErrorMiddleware = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    next(res.status(500).json({ message: 'Непредвиденная ошибка!' }));
};
