import { NextFunction, Response } from 'express';
import { Transaction } from 'sequelize';
import { RequestWithUser } from '../../../middlewares/auth-middleware';
import { SequelizeConnect } from '../../../services/databasse-connect';
import { UnitMeasureBusinessService } from '../../../services/unit_measures-services/unit_measure.business.service';


export class UnitMeasureController {
    static async create(req: RequestWithUser, res: Response, next: NextFunction) {
        const transaction: Transaction = await SequelizeConnect.transaction();
        try {
            const { user, body: { unitMeasureInfo } } = req;
            await UnitMeasureBusinessService.create(user.role, unitMeasureInfo, transaction);
            res.json('Единица измерения успешно создана!');
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            next(err);
        }
    }

    static async update(req: RequestWithUser, res: Response, next: NextFunction) {
        const transaction: Transaction = await SequelizeConnect.transaction();
        try {
            const { user, body: { unitMeasureInfo } } = req;
            await UnitMeasureBusinessService.update(user.role, unitMeasureInfo, transaction);

            res.json('Единица измерения успешно изменена!');
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
                    await UnitMeasureBusinessService.markDelete(user.role, parseInt(id), transaction);
                }
            }

            res.json('Организация успешно помечена на удаление!');
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            next(err);
        }
    }

    static async getAll(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { user } = req;
            res.json(await UnitMeasureBusinessService.getAll(user.role));
        } catch (err) {
            next(err);
        }
    }


    static async getCurrent(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { user, params: { id } } = req;

            res.json(await UnitMeasureBusinessService.getCurrent(user.role, parseInt(id)));
        } catch (err) {
            next(err);
        }
    }
}
