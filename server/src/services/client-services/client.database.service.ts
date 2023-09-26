import { Transaction } from 'sequelize';
import { clients, clients_has_users } from '../../../models/init-models';
import { ClientOptions } from './client.business.service';
import { randomInt } from 'crypto';


export class ClientDatabaseService {
    static async findAllClientHasUserByUserId(userId: number) {
        return await clients_has_users.findAll({
            where: {
                user_id_fk: userId
            }
        })
    }
    static async findClientHasUserDuplicate(userId: number, clientId: number) {
        return await clients_has_users.findOne({
            where: {
                user_id_fk: userId,
                client_id_fk: clientId
            }
        })
    }

    static async createClient(client: ClientOptions, transaction: Transaction) {
        return await clients.create({
            work_name: client.workName,
            full_name: client.fullName,
            business_address: client.businessAddress,
            physical_address: client.physicalAddress,
            external_id: client.externalId ? client.externalId : String(randomInt(1, 100000)),
        }, { transaction });
    }


    static async addManagerAccess(userId: number, clientId: number, transaction: Transaction) {
        return clients_has_users.create({
            client_id_fk: clientId,
            user_id_fk: userId,
        }, { transaction });
    }

    static async findAllClients(clientId: number[] = null): Promise<clients[]> {
        if (clientId === null) {
            return await clients.findAll({
                order: [
                    ['work_name', 'ASC'],
                ],
            });
        } else {
            return await clients.findAll({
                where: {
                    id: clientId,
                },
                order: [
                    ['work_name', 'ASC'],
                ],
                raw: true,
            });
        }
    }

    static async findManagerClients(userId: number) {
        return await clients_has_users.findAll({
            where: {
                user_id_fk: userId,
            },
            attributes: ['client_id_fk'],
            raw: true,
        });
    }

    static async findClientByPK(id: number): Promise<clients | null> {
        return await clients.findOne({
            where: {
                id: id,
            },
        });
    }

    static async findDuplicate(clientInfo: ClientOptions): Promise<clients | null> {
        return await clients.findOne({
            where: {
                work_name: clientInfo.workName,
                full_name: clientInfo.fullName,
                business_address: clientInfo.businessAddress,
                physical_address: clientInfo.physicalAddress,
            },
        });
    }

    static async findMarkedDeleted() {
        return await clients.findAll({
            where: {
                is_deleted: true,
            },
        });
    }

    static async findClientHasUserByClientId(clientId: number): Promise<clients_has_users[]> {
        return await clients_has_users.findAll({
            where: {
                client_id_fk: clientId,
            },
        });
    }

    static async findClientHasUserByUserId(userId: number) {
        return await clients_has_users.findOne({
            where: {
                user_id_fk: userId
            }
        })
    }
}
