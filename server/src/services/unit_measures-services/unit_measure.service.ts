import { Transaction } from 'sequelize';
import { unit_measures } from '../../../models/init-models';
import { ApiError } from '../../errors/api.error';
import { SaveUnitMeasure } from './unit_measure.business.service';
import { UnitMeasureDatabaseService } from './unit_measure.database.service';


export class UnitMeasureService {

    static async create(unitMeasureInfo: SaveUnitMeasure, transaction: Transaction): Promise<void> {
        await UnitMeasureDatabaseService.create(unitMeasureInfo, transaction);
    }

    static async update(unitMeasureInfo: SaveUnitMeasure, transaction: Transaction): Promise<void> {
        const unitMeasure = await this.getById(unitMeasureInfo.id);

        unitMeasure.name = unitMeasureInfo.name;
        unitMeasure.full_name = unitMeasureInfo.fullName;

        await unitMeasure.save({ transaction });
    }

    static async getById(id: number): Promise<unit_measures> {
        const unitMeasure = await UnitMeasureDatabaseService.findById(id);
        if (!unitMeasure) {
            throw ApiError.BadRequest('Такой единицы измерения не существует!');
        }

        return unitMeasure;
    }

    static async getAll(): Promise<unit_measures[]> {
        const unitMeasures = await UnitMeasureDatabaseService.findAll();
        if (unitMeasures.length === 0) {
            throw ApiError.BadRequest('Единиц измерения не существует!');
        }

        return unitMeasures;
    }

    static async isDuplicate(unitMeasureInfo: SaveUnitMeasure): Promise<boolean> {
        const orders = await UnitMeasureDatabaseService.findDuplicate(unitMeasureInfo);
        return !!(orders);
    }


    static async createArrayDto(unit_measure: unit_measures[]): Promise<SaveUnitMeasure[]> {
        const unit_measures = [];
        for (let i = 0; i < unit_measure.length; i++) {
            unit_measures.push({
                id: unit_measure[i].id,
                fullName: unit_measure[i].full_name,
                name: unit_measure[i].name,
                isDeleted: unit_measure[i].is_deleted,
            });
        }
        return unit_measures;
    }

    static async createDto(unit_measure: unit_measures): Promise<SaveUnitMeasure> {
        return {
            id: unit_measure.id,
            fullName: unit_measure.full_name,
            name: unit_measure.name,
            isDeleted: unit_measure.is_deleted,
        };
    }

    static async delete(id: number, transaction: Transaction) {
        const unitMeasure = await this.getById(id);

        unitMeasure.is_deleted = !unitMeasure.is_deleted;

        await unitMeasure.save({ transaction });
    }
}