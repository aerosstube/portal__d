import { Transaction } from 'sequelize';
import { nomenclature } from '../../../models/init-models';
import { SaveNomenclature } from './nomenclature.business.service';
import { randomInt } from 'crypto';


export class NomenclatureDatabaseService {

    static async create(nomenclatureInfo: SaveNomenclature, transaction: Transaction) {
        return await nomenclature.create({
            external_id: nomenclatureInfo.externalId ? nomenclatureInfo.externalId : String(randomInt(1, 100000)),
            work_name: nomenclatureInfo.workName,
            full_name: nomenclatureInfo.fullName,
            unit_measure_id_fk: nomenclatureInfo.unit_measure_id_fk,
        }, { transaction });
    }

    static async findById(id: number): Promise<nomenclature | null> {
        return nomenclature.findOne({
            where: {
                id: id,
            },
        });
    }

    static async findDuplicate(nomenclatureInfo: SaveNomenclature): Promise<nomenclature | null> {
        return await nomenclature.findOne({
            where: {
                work_name: nomenclatureInfo.workName,
                full_name: nomenclatureInfo.fullName,
                unit_measure_id_fk: nomenclatureInfo.unit_measure_id_fk,
            },
        });
    }

    static async findAll() {
        return await nomenclature.findAll({
            order: [
                ['id', 'ASC'],
            ],
        });
    }

    static async findMarkedDeleted() {
        return await nomenclature.findAll({
            where: {
                is_deleted: true,
            },
        });
    }
}
