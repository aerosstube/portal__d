import { Transaction } from 'sequelize';
import { counterparty_types } from '../../../models/init-models';
import { Utils } from '../../utils/utils';
import { CounterpartyService } from './counterparty.service';
import { ClientOptions } from '../client-services/client.business.service';
import { OrderService } from '../order-services/order.service';
import { CounterpartyDatabaseService } from './counterparty.database.service';


export interface SaveCounterparty {
    id?: number,
    client_id_fk: number,
    workName: string,
    fullName: string,
    businessAddress: string,
    physicalAddress: string,
    inn: string,
    kpp: string,
    counterparty_type_id_fk: number,
    phoneNumber: string,
    isDeleted: boolean
    externalId: string
}

export interface CounterpartyOptions {
    id?: number,
    client: ClientOptions | ClientOptions[],
    workName: string,
    fullName: string,
    businessAddress: string,
    physicalAddress: string,
    inn: string,
    kpp: string,
    counterparty_type: counterparty_types,
    isDeleted: boolean,
    phoneNumber: string
    externalId: string
}

export class CounterpartyBusinessService {
    static async createCounterparty(userRole: string, counterpartyInfo: SaveCounterparty, transaction: Transaction): Promise<void> {
        Utils.checkRoleAccess(userRole);
        Utils.isDuplicate(await CounterpartyService.isDuplicate(counterpartyInfo));


        await CounterpartyService.createCounterparty(counterpartyInfo, transaction);
    }

    static async updateCounterparty(userRole: string, counterpartyInfo: SaveCounterparty, transaction: Transaction): Promise<void> {
        Utils.checkRoleAccess(userRole);

        await CounterpartyService.updateCounterparty(counterpartyInfo, transaction);
    }

    static async delete(id: number, transaction: Transaction): Promise<void> {
        const counterparty = await CounterpartyService.getCurrentCounterparty(id);
        const orders = await OrderService.getOrdersBySomeId({
            where: {
                counterparty_id_fk: id,
            },
        });

        for (let i = 0; i < orders.length; i++) {
            orders[i].counterparty_id_fk = null;
            await orders[i].save({ transaction });
        }

        await counterparty.destroy({ transaction });
    }

    static async markDelete(userRole: string, id: number, transaction: Transaction) {
        Utils.checkRoleAccess(userRole);

        await CounterpartyService.markDelete(id, transaction);
    }

    static async getCounterpartyTypes(userRole: string): Promise<counterparty_types[]> {
        Utils.checkRoleAccess(userRole);
        return await CounterpartyService.getCounterpartyTypes();
    }

    static async getCounterpartyList(userRole: string): Promise<CounterpartyOptions[]> {
        Utils.checkRoleAccess(userRole);
        return await CounterpartyService.createArrayDto(await CounterpartyService.getCounterpartyList());
    }

    static async getCurrentCounterparty(id: number, userRole: string): Promise<CounterpartyOptions> {
        Utils.checkRoleAccess(userRole);
        return await CounterpartyService.createDto(await CounterpartyService.getCurrentCounterparty(id));
    }

    static async getMarkedDeleted(): Promise<CounterpartyOptions[]> {
        return await CounterpartyService.createArrayDto(await CounterpartyDatabaseService.getMarkedDeleted());
    }

}
