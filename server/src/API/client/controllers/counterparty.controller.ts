import { NextFunction, Response } from 'express';
import { Transaction } from 'sequelize';
import { RequestWithUser } from '../../../middlewares/auth-middleware';
import { CounterpartyBusinessService } from '../../../services/counterpartie-services/counterparty.business.service';
import { SequelizeConnect } from '../../../services/databasse-connect';


export class CounterpartyController {
    static async create(req: RequestWithUser, res: Response, next: NextFunction) {
        const transaction: Transaction = await SequelizeConnect.transaction();
        try {
            const { user, body: { counterpartyInfo } } = req;
            await CounterpartyBusinessService.createCounterparty(user.role, counterpartyInfo, transaction);
            res.json('Контрагент успешно создан!');
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            next(err);
        }
    }

    static async update(req: RequestWithUser, res: Response, next: NextFunction) {
        const transaction: Transaction = await SequelizeConnect.transaction();
        try {
            const { user, body: { counterpartyInfo } } = req;
            await CounterpartyBusinessService.updateCounterparty(user.role, counterpartyInfo, transaction);
            res.json('Контрагент успешно обновлен!');
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
                    await CounterpartyBusinessService.markDelete(user.role, parseInt(id), transaction);
                }
            }

            res.json('Контрагент успешно помечен на удаление!');
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            next(err);
        }
    }

    static async getCounterpartyTypes(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { user } = req;
            res.json(await CounterpartyBusinessService.getCounterpartyTypes(user.role));
        } catch (err) {
            next(err);
        }
    }

    static async getAll(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { user } = req;
            res.json(await CounterpartyBusinessService.getCounterpartyList(user.role));
        } catch (err) {
            next(err);
        }
    }


    static async getCurrent(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { user, params: { id } } = req;
            res.json(await CounterpartyBusinessService.getCurrentCounterparty(parseInt(id), user.role));
        } catch (err) {
            next(err);
        }
    }
}
