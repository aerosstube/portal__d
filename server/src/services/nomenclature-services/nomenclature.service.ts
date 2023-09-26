import { Transaction } from 'sequelize';
import { nomenclature } from '../../../models/init-models';
import { ApiError } from '../../errors/api.error';
import { NomenclatureOptions, SaveNomenclature } from './nomenclature.business.service';
import { NomenclatureDatabaseService } from './nomenclature.database.service';
import { UnitMeasureService } from '../unit_measures-services/unit_measure.service';


export class NomenclatureService {

    static async create(nomenclatureInfo: SaveNomenclature, transaction: Transaction): Promise<void> {
        await NomenclatureDatabaseService.create(nomenclatureInfo, transaction);
    }

    static async update(nomenclatureInfo: SaveNomenclature, transaction: Transaction): Promise<void> {
        const nomenclature = await this.getById(nomenclatureInfo.id);

        nomenclature.work_name = nomenclatureInfo.workName;
        nomenclature.full_name = nomenclatureInfo.fullName;
        nomenclature.unit_measure_id_fk = nomenclatureInfo.unit_measure_id_fk;
        nomenclature.external_id = nomenclatureInfo.externalId ? nomenclatureInfo.externalId : nomenclature.external_id

        await nomenclature.save({ transaction });
    }

    static async getById(id: number): Promise<nomenclature> {
        const unitMeasure = await NomenclatureDatabaseService.findById(id);
        if (!unitMeasure) {
            throw ApiError.BadRequest('Такой единицы измерения не существует!');
        }

        return unitMeasure;
    }

    static async getAll(): Promise<nomenclature[]> {
        const unitMeasures = await NomenclatureDatabaseService.findAll();
        if (unitMeasures.length === 0) {
            throw ApiError.BadRequest('Единиц измерения не существует!');
        }

        return unitMeasures;
    }

    static async isDuplicate(nomenclatureInfo: SaveNomenclature): Promise<boolean> {
        const orders = await NomenclatureDatabaseService.findDuplicate(nomenclatureInfo);
        return !!(orders);
    }

    static async createArrayDto(nomenclature: nomenclature[]): Promise<NomenclatureOptions[]> {
        const nomenclatures = [];
        for (let i = 0; i < nomenclature.length; i++) {
            nomenclatures.push({
                id: nomenclature[i].id,
                fullName: nomenclature[i].full_name,
                unit_measure: !nomenclature[i].unit_measure_id_fk ? null : await UnitMeasureService.createDto(await UnitMeasureService.getById(nomenclature[i].unit_measure_id_fk)),
                workName: nomenclature[i].work_name,
                isDeleted: nomenclature[i].is_deleted,

            });
        }
        return nomenclatures;
    }

    static async createDto(nomenclature: nomenclature): Promise<NomenclatureOptions> {
        return {
            id: nomenclature.id,
            fullName: nomenclature.full_name,
            unit_measure: !nomenclature.unit_measure_id_fk ? null : await UnitMeasureService.createDto(await UnitMeasureService.getById(nomenclature.unit_measure_id_fk)),
            workName: nomenclature.work_name,
            isDeleted: nomenclature.is_deleted,
            externalId: nomenclature.external_id
        };
    }

    static async delete(id: number, transaction: Transaction) {
        const nomenclature = await this.getById(id);

        nomenclature.is_deleted = !nomenclature.is_deleted;

        await nomenclature.save({ transaction });
    }
}
