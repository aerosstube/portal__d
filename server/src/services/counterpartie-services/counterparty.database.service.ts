import { Transaction } from 'sequelize';
import { counterparties, counterparty_types } from '../../../models/init-models';
import { SaveCounterparty } from './counterparty.business.service';
import { randomInt } from 'crypto';


export class CounterpartyDatabaseService {

    static async findAllCounterpartyTypes(): Promise<counterparty_types[]> {
        return await counterparty_types.findAll({
            raw: true,
            order: [
                ['type', 'ASC'],
            ],
        });
    }

    static async findCounterparties(): Promise<counterparties[]> {
        return await counterparties.findAll({
            order: [
                ['id', 'ASC'],
            ],
            raw: true,
        });
    }

    static async findCounterpartyTypeById(id: number): Promise<counterparty_types | null> {
        return await counterparty_types.findOne({
            where: {
                id: id,
            },
        });
    }

    static async putCounterparty(counterpartyInfo: SaveCounterparty, transaction: Transaction) {
        return await counterparties.create(
            {
                external_id: counterpartyInfo.externalId ? counterpartyInfo.externalId : String(randomInt(1, 10000)),
                client_id_fk: counterpartyInfo.client_id_fk,
                full_name: counterpartyInfo.fullName,
                work_name: counterpartyInfo.workName,
                business_address: counterpartyInfo.businessAddress,
                physical_address: counterpartyInfo.physicalAddress,
                inn: counterpartyInfo.inn,
                kpp: counterpartyInfo.kpp,
                counterparty_type_id_fk: counterpartyInfo.counterparty_type_id_fk,
                phone_number: counterpartyInfo.phoneNumber
            }, { transaction },
        );
    }

    static async findCounterpartyByPK(id: number): Promise<counterparties | null> {
        return await counterparties.findOne({
            where: {
                id: id,
            },
        });
    }

    static async findDuplicate(counterpartyInfo: SaveCounterparty): Promise<counterparties | null> {
        return await counterparties.findOne({
            where: {
                full_name: counterpartyInfo.fullName,
                work_name: counterpartyInfo.workName,
                inn: counterpartyInfo.inn,
                kpp: counterpartyInfo.kpp,
                business_address: counterpartyInfo.businessAddress,
                physical_address: counterpartyInfo.physicalAddress,
                client_id_fk: counterpartyInfo.client_id_fk,
                counterparty_type_id_fk: counterpartyInfo.counterparty_type_id_fk,
            },
        });
    }

    static async findCounterpartyByClientId(option: { where }) {
        return await counterparties.findAll(option);
    }

    static async getMarkedDeleted(): Promise<counterparties[]> {
        return await counterparties.findAll({
            where: {
                is_deleted: true,
            },
        });
    }
}
