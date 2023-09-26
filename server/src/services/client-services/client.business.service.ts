import { Transaction } from 'sequelize';
import { ApiError } from '../../errors/api.error';
import { Utils } from '../../utils/utils';
import { AuthUser } from '../auth-services/auth.business.service';
import { ClientService } from './client.service';
import { ClientDatabaseService } from './client.database.service';


export interface ClientOptions {
    id?: number,
    workName: string,
    fullName: string,
    businessAddress: string,
    physicalAddress: string,
    isDeleted?: boolean,
    externalId: string
}

export class ClientBusinessService {
    static async createClient(user: AuthUser, clientInfo: ClientOptions, transaction: Transaction): Promise<void> {

        Utils.checkRoleAccess(user.role);

        Utils.isDuplicate(await ClientService.isDuplicate(clientInfo));

        await ClientService.createClient(user, clientInfo, transaction);
    }

    static async updateClient(user: AuthUser, clientInfo: ClientOptions, transaction: Transaction): Promise<void> {
        Utils.checkRoleAccess(user.role);

        switch (user.role) {
            case 'Администратор':
                return await ClientService.updateClient(clientInfo, transaction);
            case 'Менеджер':
                return await ClientService.updateClient(clientInfo, transaction, user.userId);
            default:
                throw ApiError.AccessDenied();
        }
    }

    static async markDelete(userRole: string, id: number, transaction: Transaction) {
        Utils.checkRoleAccess(userRole);

        await ClientService.markDelete(id, transaction);
    }

    static async delete(id: number, transaction: Transaction): Promise<void> {
        const client = await ClientService.getClientByPK(id);
        await ClientService.deleteClientRelations(id, transaction);

        await client.destroy({ transaction });
    }

    static async getAllClients(user: AuthUser): Promise<ClientOptions[]> {
        switch (user.role) {
            case 'Администратор':
                return await ClientService.createArrayDto(await ClientService.getAllClients());
            case 'Менеджер':
                const clientIds = await ClientService.getManagerClients(user.userId);
                return await ClientService.createArrayDto(await ClientService.getAllClients(clientIds));
            default:
                throw ApiError.AccessDenied();
        }
    }

    static async getMarkedDeleted(): Promise<ClientOptions[]> {
        return await ClientService.createArrayDto(await ClientDatabaseService.findMarkedDeleted());
    }

    static async getCurrentClient(user: AuthUser, clientId: number): Promise<ClientOptions> {
        Utils.checkRoleAccess(user.role);
        if (user.role !== 'Администратор' && !(await ClientService.isManagerAccess(user.userId, clientId))) {
            throw ApiError.BadRequest('Менеджеру недоступна данная организация!');
        }

        return await ClientService.createDto(await ClientService.getClientByPK(clientId));
    }

}
