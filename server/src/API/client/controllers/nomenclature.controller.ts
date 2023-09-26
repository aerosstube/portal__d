import { NextFunction, Response } from 'express';
import { Transaction } from 'sequelize';
import { RequestWithUser } from '../../../middlewares/auth-middleware';
import { SequelizeConnect } from '../../../services/databasse-connect';
import { NomenclatureBusinessService } from '../../../services/nomenclature-services/nomenclature.business.service';


export class NomenclatureController {
    static async create(req: RequestWithUser, res: Response, next: NextFunction) {
        const transaction: Transaction = await SequelizeConnect.transaction();
        try {
            const { user, body: { nomenclatureInfo } } = req;

            await NomenclatureBusinessService.create(user.role, nomenclatureInfo, transaction);
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
            const { user, body: { nomenclatureInfo } } = req;
            await NomenclatureBusinessService.update(user.role, nomenclatureInfo, transaction);

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
                    await NomenclatureBusinessService.markDelete(user.role, parseInt(id), transaction);
                }
            }

            res.json('Номенклатура успешно помечен на удаление!');
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            next(err);
        }
    }

    static async getAll(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { user } = req;
            res.json(await NomenclatureBusinessService.getAll(user.role));
        } catch (err) {
            next(err);
        }
    }


    static async getCurrent(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { user, params: { id } } = req;

            res.json(await NomenclatureBusinessService.getCurrent(user.role, parseInt(id)));
        } catch (err) {
            next(err);
        }
    }
}
