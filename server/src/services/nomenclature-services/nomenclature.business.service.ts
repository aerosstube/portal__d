import { Transaction } from 'sequelize';
import { Utils } from '../../utils/utils';
import { NomenclatureService } from './nomenclature.service';
import { SaveUnitMeasure } from '../unit_measures-services/unit_measure.business.service';
import { ProductDatabaseService } from '../product-services/product.database.service';
import { NomenclatureDatabaseService } from './nomenclature.database.service';


export interface SaveNomenclature {
    id: number,
    fullName: string,
    workName: string,
    unit_measure_id_fk: number,
    externalId: string
    isDeleted: boolean;
}


export interface NomenclatureOptions {
    id: number,
    fullName: string,
    workName: string,
    externalId: string
    unit_measure: SaveUnitMeasure,
    isDeleted: boolean;
}

export class NomenclatureBusinessService {
    static async create(userRole: string, nomenclatureInfo: SaveNomenclature, transaction: Transaction): Promise<void> {
        Utils.checkRoleAccess(userRole);
        Utils.isDuplicate(await NomenclatureService.isDuplicate(nomenclatureInfo));

        await NomenclatureService.create(nomenclatureInfo, transaction);
    }

    static async delete(nomenclatureId: number, transaction: Transaction): Promise<void> {
        const nomenclature = await NomenclatureService.getById(nomenclatureId);
        const products = await ProductDatabaseService.findAllByNomenclatureId(nomenclatureId);
        for (let i = 0; i < products.length; i++) {
            products[i].nomenclature_id_fk = null;
            await products[i].save({ transaction });
        }
        await nomenclature.destroy({ transaction });
    }

    static async update(userRole: string, nomenclatureInfo: SaveNomenclature, transaction: Transaction): Promise<void> {
        Utils.checkRoleAccess(userRole);
        Utils.isDuplicate(await NomenclatureService.isDuplicate(nomenclatureInfo));

        await NomenclatureService.update(nomenclatureInfo, transaction);
    }

    static async markDelete(userRole: string, id: number, transaction: Transaction) {
        Utils.checkRoleAccess(userRole);
        await NomenclatureService.delete(id, transaction);
    }

    static async getAll(userRole: string): Promise<NomenclatureOptions[]> {
        Utils.checkRoleAccess(userRole);

        return NomenclatureService.createArrayDto(await NomenclatureService.getAll());
    }


    static async getCurrent(userRole: string, id: number): Promise<NomenclatureOptions> {
        Utils.checkRoleAccess(userRole);

        return NomenclatureService.createDto(await NomenclatureService.getById(id));
    }

    static async getMarkedDeleted(): Promise<NomenclatureOptions[]> {
        return await NomenclatureService.createArrayDto(await NomenclatureDatabaseService.findMarkedDeleted());
    }

}
