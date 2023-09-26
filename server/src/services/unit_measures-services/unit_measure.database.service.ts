import { Transaction } from 'sequelize';
import { unit_measures } from '../../../models/init-models';
import { SaveUnitMeasure } from './unit_measure.business.service';


export class UnitMeasureDatabaseService {

    static async create(unitMeasureInfo: SaveUnitMeasure, transaction: Transaction) {
        return await unit_measures.create({
            name: unitMeasureInfo.name,
            full_name: unitMeasureInfo.fullName,
        }, { transaction });
    }

    static async findById(id: number): Promise<unit_measures | null> {
        return unit_measures.findOne({
            where: {
                id: id,
            },
        });
    }

    static async findDuplicate(unitMeasureInfo: SaveUnitMeasure): Promise<unit_measures | null> {
        return await unit_measures.findOne({
            where: {
                name: unitMeasureInfo.name,
                full_name: unitMeasureInfo.fullName,
            },
        });
    }

    static async findAll() {
        return await unit_measures.findAll({
            order: [
                ['id', 'ASC'],
            ],
        });
    }

    static async findAllMarkedDeleted() {
        return await unit_measures.findAll({
            where: {
                is_deleted: true,
            },
        });
    }
}
