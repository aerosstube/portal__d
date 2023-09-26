import { Transaction } from 'sequelize';
import { clients } from '../../../models/clients';
import { ApiError } from '../../errors/api.error';
import { AuthUser } from '../auth-services/auth.business.service';
import { ClientOptions } from './client.business.service';
import { ClientDatabaseService } from './client.database.service';
import { CounterpartyService } from '../counterpartie-services/counterparty.service';
import { OrderService } from '../order-services/order.service';


export class ClientService {
    static async createClient(user: AuthUser, clientInfo: ClientOptions, transaction: Transaction): Promise<void> {
        const client = await ClientDatabaseService.createClient(clientInfo, transaction);
        if (user.role === 'Менеджер') {
            ClientDatabaseService.addManagerAccess(user.userId, client.id, transaction);
        }
    }

    static async addManagerAccess(userId: number, clientIds: any, transaction: Transaction) {
        const clientHasUser = await ClientDatabaseService.findAllClientHasUserByUserId(userId)
        for (const client of clientHasUser) {
            await client.destroy({ transaction })
        }
        if (clientIds)
            for (let i = 0; i < clientIds.length; i++) {
                await ClientDatabaseService.addManagerAccess(userId, parseInt(clientIds[i]), transaction)
            }
    }

    static async getAllClients(clientId: number[] = null): Promise<clients[]> {
        return await ClientDatabaseService.findAllClients(clientId);
    }

    static async getManagerClients(userId: number): Promise<number[]> {
        const clientIds = await ClientDatabaseService.findManagerClients(userId);
        const res = clientIds.map(({ client_id_fk }) => client_id_fk);
        if (res.length === 0) {
            throw ApiError.BadRequest('У менеджера нет доступных партнеров!');
        }
        return res;
    }

    static async getClientByPK(id: number): Promise<clients> {
        const client = await ClientDatabaseService.findClientByPK(id);
        if (!client) {
            throw ApiError.BadRequest('Такого партнера не существует!');
        }

        return client;
    }

    static async deleteClientRelations(clientId: number, transaction: Transaction) {
        const findOption = {
            where: {
                client_id_fk: clientId,
            },
        };

        const clientHasUser = await ClientDatabaseService.findClientHasUserByClientId(clientId);
        for (let i = 0; i < clientHasUser.length; i++) {
            await clientHasUser[i].destroy({ transaction });
        }

        const counterparty = await CounterpartyService.getCurrentCounterpartySomeId(findOption);
        for (let i = 0; i < counterparty.length; i++) {
            counterparty[i].client_id_fk = null;
            await counterparty[i].save({ transaction });
        }

        const order = await OrderService.getOrdersBySomeId(findOption);
        for (let i = 0; i < order.length; i++) {
            order[i].client_id_fk = null;
            await order[i].save({ transaction });
        }
    }

    static async isDuplicate(clientInfo: ClientOptions): Promise<boolean> {
        const client = await ClientDatabaseService.findDuplicate(clientInfo);
        return !!(client);
    }

    static async isManagerAccess(userId: number, clientId: number): Promise<boolean> {
        const clientIds = await ClientService.getManagerClients(userId);
        for (let i = 0; i < clientIds.length; i++) {
            if (clientIds[i] === clientId) {
                return true;
            }
        }
        return false;
    }

    static async updateClient(clientInfo: ClientOptions, transaction: Transaction, userId: number = null): Promise<void> {
        if (userId !== null && !(await ClientService.isManagerAccess(userId, clientInfo.id))) {
            throw ApiError.BadRequest('Менеджеру недоступна данная организация!');
        }
        const client = await this.getClientByPK(clientInfo.id);

        client.business_address = clientInfo.businessAddress;
        client.physical_address = clientInfo.physicalAddress;
        client.work_name = clientInfo.workName;
        client.full_name = clientInfo.fullName;
        client.external_id = clientInfo.externalId ? clientInfo.externalId : client.external_id
        await client.save({ transaction });
    }


    static async createArrayDto(client: clients[]): Promise<ClientOptions[]> {
        const clients = [];
        for (let i = 0; i < client.length; i++) {
            clients.push({
                id: client[i].id,
                businessAddress: client[i].business_address,
                fullName: client[i].full_name,
                physicalAddress: client[i].physical_address,
                workName: client[i].work_name,
                isDeleted: client[i].is_deleted,
            });
        }
        return clients;
    }

    static async createDto(client: clients): Promise<ClientOptions> {
        return {
            id: client.id,
            businessAddress: client.business_address,
            fullName: client.full_name,
            physicalAddress: client.physical_address,
            workName: client.work_name,
            isDeleted: client.is_deleted,
            externalId: client.external_id
        };
    }

    static async markDelete(id: number, transaction: Transaction): Promise<void> {
        const client = await this.getClientByPK(id);

        client.is_deleted = !client.is_deleted;

        await client.save({ transaction });
    }
}
