import { NextFunction, Response } from 'express';
import { Transaction } from 'sequelize';
import { RequestWithUser } from '../../../middlewares/auth-middleware';
import { SequelizeConnect } from '../../../services/databasse-connect';
import { OrderBusinessService } from '../../../services/order-services/order.business.service';


export class OrderController {
    static async create(req: RequestWithUser, res: Response, next: NextFunction) {
        const transaction: Transaction = await SequelizeConnect.transaction();
        try {
            const { body: { orderInfo }, user } = req;
            res.status(200).json(await OrderBusinessService.createOrder(user, orderInfo, transaction))
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            next(err);
        }
    }

    static async update(req: RequestWithUser, res: Response, next: NextFunction) {
        const transaction: Transaction = await SequelizeConnect.transaction();
        try {
            const { body: { orderInfo }, user } = req;
            await OrderBusinessService.updateOrder(user.role, orderInfo, transaction);
            res.status(200).json('Заказ успешно обновлен!');
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            next(err);
        }
    }

    static async delete(req: RequestWithUser, res: Response, next: NextFunction) {
        const transaction: Transaction = await SequelizeConnect.transaction();
        try {
            const { query: { ids }, user } = req;
            if (typeof ids === 'string') {
                for (const id of ids.split(',')) {

                    await OrderBusinessService.markDelete(user.role, parseInt(id), transaction);
                }
            }

            res.json('Заказ успешно помечен на удаление!');
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            next(err);
        }
    }


    static async getAll(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { user } = req;
            res.status(200).json(await OrderBusinessService.getAllOrders(user.role));
        } catch (err) {
            next(err);
        }
    }

    static async getCurrent(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { user, params: { id } } = req;
            res.status(200).json(await OrderBusinessService.getCurrent(user.role, parseInt(id)));
        } catch (err) {
            next(err);
        }
    }

    static async getOrderStatuses(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { user } = req;
            res.status(200).json(await OrderBusinessService.getAllStatuses(user.role));
        } catch (err) {
            next(err);
        }
    }
}
