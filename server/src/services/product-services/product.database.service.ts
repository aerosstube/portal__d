import { Transaction } from 'sequelize';
import { products } from '../../../models/products';
import { SaveProduct } from './product.business.service';


export class ProductDatabaseService {
    static async create(productInfo: SaveProduct, transaction: Transaction) {
        return await products.create({
            vat_total: productInfo.vatTotal,
            nomenclature_id_fk: productInfo.nomenclature_id_fk,
            unit_measure_id_fk: productInfo.unit_measure_id_fk,
            vat_rate_id_fk: productInfo.vat_rate_id_fk,
            order_id_fk: productInfo.order_id_fk,
            amount: productInfo.amount,
            cost: productInfo.cost,
            total: productInfo.total,
            sale: productInfo.sale,
            total_sum: productInfo.totalSum,
        }, { transaction });
    }

    static async findById(id: number): Promise<products | null> {
        return await products.findOne({
            where: {
                id: id,
            },
        });
    }

    static async findDuplicate(productInfo: SaveProduct) {
        return await products.findOne({
            where: {
                nomenclature_id_fk: productInfo.nomenclature_id_fk,
                order_id_fk: productInfo.order_id_fk,
                unit_measure_id_fk: productInfo.unit_measure_id_fk,
                vat_rate_id_fk: productInfo.vat_rate_id_fk,
                amount: productInfo.amount,
                cost: productInfo.cost,
                total: productInfo.total,
                sale: productInfo.sale,
                total_sum: productInfo.totalSum,
                vat_total: productInfo.vatTotal,
            },
        });
    }


    static async findAllByOrderId(id: number): Promise<products[]> {
        return await products.findAll({
            where: {
                order_id_fk: id,
            },
            order: [
                ['id', 'ASC'],
            ],
        });
    }

    static async findByOrderId(id: number): Promise<products | null> {
        return await products.findOne({
            where: {
                order_id_fk: id,
            },
        });
    }

    static async findAllByNomenclatureId(nomenclatureId: number) {
        return await products.findAll({
            where: {
                nomenclature_id_fk: nomenclatureId,
            },
        });
    }
}