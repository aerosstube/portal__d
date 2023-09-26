import { RequestWithUser } from '../../../middlewares/auth-middleware';
import { NextFunction, Response } from 'express';
import { Transaction } from 'sequelize';
import { SequelizeConnect } from '../../../services/databasse-connect';
import { OrganizationBusinessService } from '../../../services/organization-services/organization.business.service';


export class OrganizationController {
    static async delete(req: RequestWithUser, res: Response, next: NextFunction) {
        const transaction: Transaction = await SequelizeConnect.transaction();
        try {
            const { query: { ids } } = req;
            if (typeof ids === 'string') {
                for (const id of ids.split(',')) {
                    await OrganizationBusinessService.delete(parseInt(id), transaction);
                }
                res.status(200).json('Удалено успешно!');
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
            res.json(await OrganizationBusinessService.getMarkedDeleted());
        } catch (err) {
            next(err);
        }
    }
}
