import { RequestWithUser } from '../../../middlewares/auth-middleware';
import { NextFunction, Response } from 'express';
import { Transaction } from 'sequelize';
import { SequelizeConnect } from '../../../services/databasse-connect';
import { NomenclatureBusinessService } from '../../../services/nomenclature-services/nomenclature.business.service';


export class NomenclatureController {
    static async delete(req: RequestWithUser, res: Response, next: NextFunction) {
        const transaction: Transaction = await SequelizeConnect.transaction();
        try {
            const { query: { ids } } = req;

            if (typeof ids === 'string') {
                for (const id of ids.split(',')) {
                    await NomenclatureBusinessService.delete(parseInt(id), transaction);
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
            res.status(200).json(await NomenclatureBusinessService.getMarkedDeleted());
        } catch (err) {
            next(err);
        }
    }
}
