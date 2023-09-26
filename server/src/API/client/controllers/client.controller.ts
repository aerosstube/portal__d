import { NextFunction, Response } from 'express';
import { Transaction } from 'sequelize';
import { RequestWithUser } from '../../../middlewares/auth-middleware';
import { ClientBusinessService } from '../../../services/client-services/client.business.service';
import { SequelizeConnect } from '../../../services/databasse-connect';


export class ClientController {
    static async create(req: RequestWithUser, res: Response, next: NextFunction) {
        const transaction = await SequelizeConnect.transaction();
        try {
            const { body: { clientInfo }, user } = req;

            await ClientBusinessService.createClient(user, clientInfo, transaction);
            res.json('Партнер успешно создан!');
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            next(err);
        }
    }

    static async update(req: RequestWithUser, res: Response, next: NextFunction) {
        const transaction: Transaction = await SequelizeConnect.transaction();
        try {
            const { body: { clientInfo }, user } = req;
            await ClientBusinessService.updateClient(user, clientInfo, transaction);
            res.json('Партнер успешно обновлен!');
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
                    await ClientBusinessService.markDelete(user.role, parseInt(id), transaction);
                }
            }

            res.json('Партнер успешно помечен на удаление!');
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            next(err);
        }
    }

    static async getAll(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { user } = req;
            res.json(await ClientBusinessService.getAllClients(user));
        } catch (err) {
            next(err);
        }
    }

    static async getCurrent(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { user, params: { id } } = req;

            res.json(await ClientBusinessService.getCurrentClient(user, parseInt(id)));
        } catch (err) {
            next(err);
        }
    }
}
