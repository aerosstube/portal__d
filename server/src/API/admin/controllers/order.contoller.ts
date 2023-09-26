import { RequestWithUser } from '../../../middlewares/auth-middleware';
import { NextFunction, Response } from 'express';
import { SequelizeConnect } from '../../../services/databasse-connect';
import { Transaction } from 'sequelize';
import { OrderBusinessService } from '../../../services/order-services/order.business.service';


export class OrderController {
    static async delete(req: RequestWithUser, res: Response, next: NextFunction) {
        const transaction: Transaction = await SequelizeConnect.transaction();
        try {
            const { query: { ids } } = req;
            if (typeof ids === 'string') {
                for (const id of ids.split(',')) {
                    await OrderBusinessService.delete(parseInt(id), transaction);
                }
                res.status(200).json('Удаление прошло успешно!');
            } else {
                res.status(400).json('Ошибка удаления');
            }
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            next(err);
        }
    }

    static async getMarkedDeleted(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            res.json(await OrderBusinessService.getMarkedDeleted());
        } catch (err) {
            next(err);
        }
    }
}
