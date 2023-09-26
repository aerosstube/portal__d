import { RequestWithUser } from '../../../middlewares/auth-middleware';
import { NextFunction, Response } from 'express';
import { SequelizeConnect } from '../../../services/databasse-connect';
import { Transaction } from 'sequelize';
import { CounterpartyBusinessService } from '../../../services/counterpartie-services/counterparty.business.service';


export class CounterpartyController {
    static async delete(req: RequestWithUser, res: Response, next: NextFunction) {
        const transaction: Transaction = await SequelizeConnect.transaction();
        try {
            const { query: { ids } } = req;

            if (typeof ids === 'string') {
                for (const id of ids.split(',')) {
                    await CounterpartyBusinessService.delete(parseInt(id), transaction);
                }
                res.status(200).json('Успешно удалено!');
            } else {
                res.status(401).json('Ошибка удаления!');
            }
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            next(err);
        }
    }

    static async getMarkedDeleted(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            res.status(200).json(await CounterpartyBusinessService.getMarkedDeleted());
        } catch (err) {
            next(err);
        }
    }
}
