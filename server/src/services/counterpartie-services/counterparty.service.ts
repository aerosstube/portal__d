import { Transaction } from 'sequelize';
import { counterparties, counterparty_types } from '../../../models/init-models';
import { ApiError } from '../../errors/api.error';
import { CounterpartyOptions, SaveCounterparty } from './counterparty.business.service';
import { CounterpartyDatabaseService } from './counterparty.database.service';
import { ClientService } from '../client-services/client.service';
import { randomInt } from 'crypto';


export class CounterpartyService {

    static async createCounterparty(counterpartyInfo: SaveCounterparty, transaction: Transaction): Promise<void> {
        await CounterpartyDatabaseService.putCounterparty(counterpartyInfo, transaction);
    }

    static async updateCounterparty(counterpartyInfo: SaveCounterparty, transaction: Transaction) {
        const counterparty = await this.getCurrentCounterparty(counterpartyInfo.id);

        counterparty.inn = counterpartyInfo.inn;
        counterparty.kpp = counterpartyInfo.kpp;
        counterparty.business_address = counterpartyInfo.businessAddress;
        counterparty.physical_address = counterpartyInfo.physicalAddress;
        counterparty.counterparty_type_id_fk = counterpartyInfo.counterparty_type_id_fk;
        counterparty.client_id_fk = counterpartyInfo.client_id_fk;
        counterparty.full_name = counterpartyInfo.fullName;
        counterparty.work_name = counterpartyInfo.workName;
        counterparty.phone_number = counterpartyInfo.phoneNumber
        counterparty.external_id = counterpartyInfo.externalId ? counterpartyInfo.externalId : counterparty.external_id

        await counterparty.save({ transaction });
    }

    static async getCurrentCounterparty(id: number) {
        const counterparty = await CounterpartyDatabaseService.findCounterpartyByPK(id);
        if (!counterparty) {
            throw ApiError.BadRequest('Такого контрагента не существует!');
        }

        return counterparty;
    }

    static async getCounterpartyTypes(): Promise<counterparty_types[]> {
        const counterpartyTypes = await CounterpartyDatabaseService.findAllCounterpartyTypes();
        if (counterpartyTypes.length === 0) {
            throw ApiError.BadRequest('Такого типа у контрагента не существует!');
        }

        return counterpartyTypes;
    }

    static async getCounterpartyTypeById(id: number): Promise<counterparty_types> {
        const counterpartyType = await CounterpartyDatabaseService.findCounterpartyTypeById(id);
        if (!counterpartyType) {
            throw ApiError.BadRequest('Неверный id контрагента!');
        }

        return counterpartyType;
    }


    static async getCurrentCounterpartySomeId(option: { where }): Promise<counterparties[]> {
        return await CounterpartyDatabaseService.findCounterpartyByClientId(option);
    }


    static async getCounterpartyList(): Promise<counterparties[]> {
        const counterpartyList = await CounterpartyDatabaseService.findCounterparties();
        if (counterpartyList.length === 0) {
            throw ApiError.BadRequest('Контрагентов не существует!');
        }

        return counterpartyList;
    }

    static async isDuplicate(counterpartyInfo: SaveCounterparty): Promise<boolean> {
        const counterparty = await CounterpartyDatabaseService.findDuplicate(counterpartyInfo);
        return !!(counterparty);
    }


    static async createArrayDto(counterparty: counterparties[]): Promise<CounterpartyOptions[]> {
        const counterparties = [];
        for (let i = 0; i < counterparty.length; i++) {
            counterparties.push({
                id: counterparty[i].id,
                businessAddress: counterparty[i].business_address,
                counterparty_type: await this.getCounterpartyTypeById(counterparty[i].counterparty_type_id_fk),
                client: !counterparty[i].client_id_fk ? null : await ClientService.createDto(await ClientService.getClientByPK(counterparty[i].client_id_fk)),
                fullName: counterparty[i].full_name,
                inn: counterparty[i].inn,
                kpp: counterparty[i].kpp,
                physicalAddress: counterparty[i].physical_address,
                workName: counterparty[i].work_name,
                isDeleted: counterparty[i].is_deleted,
                phoneNumber: counterparty[i].phone_number,
            });
        }

        return counterparties;
    }

    static async createDto(counterparty: counterparties): Promise<CounterpartyOptions> {
        return {
            id: counterparty.id,
            businessAddress: counterparty.business_address,
            counterparty_type: await this.getCounterpartyTypeById(counterparty.counterparty_type_id_fk),
            client: !counterparty.client_id_fk ? null : await ClientService.createDto(await ClientService.getClientByPK(counterparty.client_id_fk)),
            fullName: counterparty.full_name,
            inn: counterparty.inn,
            kpp: counterparty.kpp,
            physicalAddress: counterparty.physical_address,
            workName: counterparty.work_name,
            isDeleted: counterparty.is_deleted,
            phoneNumber: counterparty.phone_number,
            externalId: counterparty.external_id
        };
    }

    static async markDelete(id: number, transaction: Transaction) {
        const counterparty = await this.getCurrentCounterparty(id);

        counterparty.is_deleted = !counterparty.is_deleted;

        await counterparty.save({ transaction });
    }

}
