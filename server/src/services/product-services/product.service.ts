import { Transaction } from 'sequelize';
import { products } from '../../../models/products';
import { ApiError } from '../../errors/api.error';
import { ProductOptions, SaveProduct } from './product.business.service';
import { ProductDatabaseService } from './product.database.service';
import { VatRatesService } from '../vat_rates-service/vat_rates.service';
import { UnitMeasureService } from '../unit_measures-services/unit_measure.service';
import { OrderService } from '../order-services/order.service';
import { NomenclatureService } from '../nomenclature-services/nomenclature.service';


export class ProductService {
    static async create(productInfo: SaveProduct, transaction: Transaction): Promise<void> {
        await ProductDatabaseService.create(productInfo, transaction);
    }

    static async update(productInfo: SaveProduct, transaction: Transaction) {
        const product = await this.getById(productInfo.id);

        product.amount = productInfo.amount;
        product.cost = productInfo.cost;
        product.id = productInfo.id;
        product.nomenclature_id_fk = productInfo.nomenclature_id_fk;
        product.order_id_fk = productInfo.order_id_fk;
        product.sale = productInfo.sale;
        product.total = productInfo.total;
        product.total_sum = productInfo.totalSum;
        product.unit_measure_id_fk = productInfo.unit_measure_id_fk;
        product.vat_total = productInfo.vatTotal;
        product.vat_rate_id_fk = productInfo.vat_rate_id_fk;

        await product.save({ transaction });
    }

    static async getById(id: number): Promise<products> {
        const product = await ProductDatabaseService.findById(id);

        if (!product) {
            throw ApiError.BadRequest('Такого товара не существует!');
        }

        return product;
    }

    static async getByOrderId(id: number): Promise<products> {
        const product = await ProductDatabaseService.findByOrderId(id);

        if (!product) {
            throw ApiError.BadRequest('Такого товара не существует!');
        }

        return product;
    }

    static async getAllByOrderId(id: number): Promise<products[]> {
        return await ProductDatabaseService.findAllByOrderId(id);
    }

    static async isDuplicate(productInfo: SaveProduct): Promise<boolean> {

        const product = await ProductDatabaseService.findDuplicate(productInfo);
        return !!(product);
    }

    static async createArrayDto(product: products[]): Promise<ProductOptions[]> {
        const products = [];
        for (let i = 0; i < product.length; i++) {
            products.push({
                id: product[i].id,
                amount: product[i].amount,
                cost: product[i].cost,
                nomenclature: !product[i].nomenclature_id_fk ? null : await NomenclatureService.createDto(await NomenclatureService.getById(product[i].nomenclature_id_fk)),
                order: !product[i].order_id_fk ? null : await OrderService.createDto(await OrderService.getById(product[i].order_id_fk)),
                sale: product[i].sale,
                total: product[i].total,
                totalSum: product[i].total_sum,
                unit_measure: !product[i].unit_measure_id_fk ? null : await UnitMeasureService.createDto(await UnitMeasureService.getById(product[i].unit_measure_id_fk)),
                vatTotal: product[i].vat_total,
                vat_rate: await VatRatesService.getById(product[i].vat_rate_id_fk),
            });
        }
        return products;
    }

    static async createDto(product: products): Promise<ProductOptions> {
        return {
            id: product.id,
            amount: product.amount,
            cost: product.cost,
            nomenclature: !product.nomenclature_id_fk ? null : await NomenclatureService.createDto(await NomenclatureService.getById(product.nomenclature_id_fk)),
            order: !product.order_id_fk ? null : await OrderService.createDto(await OrderService.getById(product.order_id_fk)),
            sale: product.sale,
            total: product.total,
            totalSum: product.total_sum,
            unit_measure: !product.unit_measure_id_fk ? null : await UnitMeasureService.createDto(await UnitMeasureService.getById(product.unit_measure_id_fk)),
            vatTotal: product.vat_total,
            vat_rate: await VatRatesService.getById(product.vat_rate_id_fk),
        };
    }
}
