import { Transaction } from 'sequelize';
import { Utils } from '../../utils/utils';
import { UnitMeasureService } from './unit_measure.service';
import { nomenclature, products } from '../../../models/init-models';
import { UnitMeasureDatabaseService } from './unit_measure.database.service';


export interface SaveUnitMeasure {
    id: number,
    fullName: string,
    name: string,
    isDeleted: boolean
}


export class UnitMeasureBusinessService {
    static async create(userRole: string, unitMeasureInfo: SaveUnitMeasure, transaction: Transaction): Promise<void> {
        Utils.checkRoleAccess(userRole);
        Utils.isDuplicate(await UnitMeasureService.isDuplicate(unitMeasureInfo));

        await UnitMeasureService.create(unitMeasureInfo, transaction);
    }

    static async update(userRole: string, unitMeasureInfo: SaveUnitMeasure, transaction: Transaction): Promise<void> {
        Utils.checkRoleAccess(userRole);
        Utils.isDuplicate(await UnitMeasureService.isDuplicate(unitMeasureInfo));

        await UnitMeasureService.update(unitMeasureInfo, transaction);
    }

    static async delete(unitMeasureId: number, transaction: Transaction): Promise<void> {
        const unitMeasure = await UnitMeasureService.getById(unitMeasureId);
        const nomenclatures = await nomenclature.findAll({
            where: {
                unit_measure_id_fk: unitMeasureId,
            },
        });

        for (let i = 0; i < nomenclatures.length; i++) {
            nomenclatures[i].unit_measure_id_fk = null;
            await nomenclatures[i].save({ transaction });
        }
        const product = await products.findAll({
            where: {
                unit_measure_id_fk: unitMeasureId,
            },
        });

        for (let i = 0; i < product.length; i++) {
            product[i].unit_measure_id_fk = null;
            await product[i].save({ transaction });
        }
        await unitMeasure.destroy({ transaction });
    }

    static async markDelete(userRole: string, id: number, transaction: Transaction) {
        Utils.checkRoleAccess(userRole);

        await UnitMeasureService.delete(id, transaction);
    }

    static async getAll(userRole: string): Promise<SaveUnitMeasure[]> {
        Utils.checkRoleAccess(userRole);

        return UnitMeasureService.createArrayDto(await UnitMeasureService.getAll());
    }


    static async getCurrent(userRole: string, id: number): Promise<SaveUnitMeasure> {
        Utils.checkRoleAccess(userRole);

        return UnitMeasureService.createDto(await UnitMeasureService.getById(id));
    }

    static async getMarkedDeleted(): Promise<SaveUnitMeasure[]> {
        return await UnitMeasureService.createArrayDto(await UnitMeasureDatabaseService.findAllMarkedDeleted());
    }
}