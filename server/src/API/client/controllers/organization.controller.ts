import { NextFunction, Response } from 'express';
import { Transaction } from 'sequelize';
import { RequestWithUser } from '../../../middlewares/auth-middleware';
import { SequelizeConnect } from '../../../services/databasse-connect';
import { OrganizationBusinessService } from '../../../services/organization-services/organization.business.service';


export class OrganizationController {
    static async create(req: RequestWithUser, res: Response, next: NextFunction) {
        const transaction: Transaction = await SequelizeConnect.transaction();
        try {
            const { body: { organizationInfo }, user } = req;

            await OrganizationBusinessService.createOrganization(user, organizationInfo, transaction);
            res.json('Организация успешно создана!');
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            next(err);
        }
    }

    static async update(req: RequestWithUser, res: Response, next: NextFunction) {
        const transaction: Transaction = await SequelizeConnect.transaction();
        try {
            const { body: { organizationInfo }, user } = req;

            await OrganizationBusinessService.updateOrganization(organizationInfo, user, transaction);
            res.json('Организация успешно изменена!');
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
                    await OrganizationBusinessService.markDelete(user.role, parseInt(id), transaction);
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
            res.json(await OrganizationBusinessService.getAllOrganizations(user));
        } catch (err) {
            next(err);
        }
    }

    static async getCurrent(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { user, params: { id } } = req;
            res.json(await OrganizationBusinessService.getCurrentOrganization(user, parseInt(id)));
        } catch (err) {
            next(err);
        }
    }

}
