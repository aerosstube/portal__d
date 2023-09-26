import { Transaction } from 'sequelize';
import { Utils } from '../../utils/utils';
import { ProductService } from './product.service';
import { NomenclatureOptions } from '../nomenclature-services/nomenclature.business.service';
import { SaveUnitMeasure } from '../unit_measures-services/unit_measure.business.service';
import { vat_rates } from '../../../models/vat_rates';
import { OrderOptions } from '../order-services/order.business.service';


export interface SaveProduct {
    id: number,
    nomenclature_id_fk: number,
    unit_measure_id_fk: number,
    vat_rate_id_fk: number,
    order_id_fk: number,
    amount: number,
    cost: number,
    total: number,
    sale: number,
    vatTotal: number,
    totalSum: number
}

export interface ProductOptions {
    id: number,
    nomenclature: NomenclatureOptions,
    unit_measure: SaveUnitMeasure,
    vat_rate: vat_rates,
    order: OrderOptions,
    amount: number,
    cost: number,
    total: number,
    sale: number,
    vatTotal: number,
    totalSum: number
}

export class ProductBusinessService {
    static async createProduct(userRole: string, productInfo: SaveProduct, transaction: Transaction): Promise<void> {
        Utils.checkRoleAccess(userRole);
        if (await ProductService.isDuplicate(productInfo)) {
            return
        }

        await ProductService.create(productInfo, transaction);
    }

    static async updateProduct(userRole: string, productInfo: SaveProduct, transaction: Transaction): Promise<void> {
        Utils.checkRoleAccess(userRole);
        await ProductService.update(productInfo, transaction);
    }

    static async getAllProducts(userRole: string, id: number): Promise<ProductOptions[]> {
        Utils.checkRoleAccess(userRole);

        return await ProductService.createArrayDto(await ProductService.getAllByOrderId(id));
    }

    static async getCurrentProduct(userRole: string, id: number): Promise<ProductOptions> {
        Utils.checkRoleAccess(userRole);

        return await ProductService.createDto(await ProductService.getByOrderId(id));
    }

    static async delete(userRole: string, id: number, transaction: Transaction): Promise<void> {
        Utils.checkRoleAccess(userRole);

        const product = await ProductService.getById(id);
        await product.destroy({ transaction });
    }
}
