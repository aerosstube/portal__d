import { NextFunction, Response } from 'express';
import { Transaction } from 'sequelize';
import { RequestWithUser } from '../../../middlewares/auth-middleware';
import { SequelizeConnect } from '../../../services/databasse-connect';
import { ProductBusinessService } from '../../../services/product-services/product.business.service';


export class ProductController {
    static async createOrUpdate(req: RequestWithUser, res: Response, next: NextFunction) {
        const transaction: Transaction = await SequelizeConnect.transaction()
        try {
            const { body: { productInfo }, user } = req;
            for (const product of productInfo) {
                if (product.id) {
                    await ProductBusinessService.updateProduct(user.role, product, transaction);
                } else {
                    await ProductBusinessService.createProduct(user.role, product, transaction);
                }
            }
            res.json('все успешно создано!')
            await transaction.commit()
        } catch (err) {
            await transaction.rollback()
            next(err)
        }
    }
    static async create(req: RequestWithUser, res: Response, next: NextFunction) {
        const transaction: Transaction = await SequelizeConnect.transaction();
        try {
            const { body: { productInfo }, user } = req;
            for (const product of productInfo) {
                await ProductBusinessService.createProduct(user.role, product, transaction);
            }
            res.status(200).json('Товар успешно создан!');
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            next(err);
        }
    }

    static async update(req: RequestWithUser, res: Response, next: NextFunction) {
        const transaction: Transaction = await SequelizeConnect.transaction();
        try {
            const { body: { productInfo }, user } = req;
            for (const product of productInfo) {
                await ProductBusinessService.updateProduct(user.role, productInfo, transaction);
            }
            res.status(200).json('Товар успешно изменен!');
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
                    await ProductBusinessService.delete(user.role, parseInt(id), transaction);
                }
                res.json('Успешно удалено!');
            } else {
                res.status(400).json('Ошибка удаления!');
            }
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            next(err);
        }
    }

    static async getAll(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { user, query: { id } } = req;

            if (typeof id === 'string') {
                res.status(200).json(await ProductBusinessService.getAllProducts(user.role, parseInt(id)));
            }
            res.status(401).json('Неверный id заказа!');
        } catch (err) {
            next(err);
        }
    }

    static async getCurrent(req: RequestWithUser, res: Response, next: NextFunction) {
        try {
            const { user, params: { id } } = req;

            res.status(200).json(await ProductBusinessService.getCurrentProduct(user.role, parseInt(id)));
        } catch (err) {
            next(err);
        }
    }
}
