import { user_roles } from '../../../models/user_roles';
import { UserService } from './user.service';
import { Transaction } from 'sequelize';
import { users } from '../../../models/users';
import { randomInt } from 'crypto';
import { ApiError } from '../../errors/api.error';
import { AuthService } from '../auth-services/auth.service';
import { AuthDatabaseService } from '../auth-services/auth.database.service';
import { ClientDatabaseService } from '../client-services/client.database.service';
import { ClientService } from '../client-services/client.service';
import { OrganizationService } from '../organization-services/organization.service';
import { OrganizationDatabaseService } from '../organization-services/organization.database.service';
import { clients_has_users } from '../../../models/clients_has_users';
import { organizations_has_users } from '../../../models/organizations_has_users';


export interface SaveUser {
    id: number,
    externalId: string,
    login: string,
    email: string,
    fullName: string,
    user_role_id_fk: number,
    password: string,
}

export interface UserOptions {
    id: number,
    externalId: string,
    login: string,
    email: string,
    fullName: string,
    user_role_id_fk: user_roles,
    password: string,
    clientHasUser?: number[]
    organizationHasUser?: number[]
}

export class UserBusinessService {
    static async getAll(): Promise<UserOptions[]> {
        return await UserService.createArrayDto(await UserService.getAll());
    }

    static async getAllRoles(): Promise<user_roles[]> {
        return await user_roles.findAll({ raw: true });
    }

    static async create(user: SaveUser, transaction: Transaction): Promise<void> {
        await users.create({
            external_id: user.externalId ? user.externalId : String(randomInt(1, 1000000)),
            login: user.login,
            email: user.email,
            full_name: user.fullName,
            user_role_id_fk: user.user_role_id_fk,
            password: user.password,
        }, { transaction });
    }

    static async change(userInfo: SaveUser, transaction: Transaction) {
        const user = await UserService.getById(userInfo.id);

        user.login = userInfo.login;
        user.email = userInfo.email;
        user.full_name = userInfo.fullName;
        user.user_role_id_fk = userInfo.user_role_id_fk;
        user.password = userInfo.password;
        user.external_id = userInfo.externalId ? userInfo.externalId : user.external_id
        await user.save({ transaction });
    }

    static async delete(id: number, transaction: Transaction) {
        const user = await UserService.getById(id)

        if (user) {
            const token = await AuthDatabaseService.findTokenByUserPK(id)
            if (token) { token.destroy({ transaction }) }

            const clientHasUser = await ClientDatabaseService.findClientHasUserByUserId(id)
            if (clientHasUser) {
                await ClientService.deleteClientRelations(clientHasUser.client_id_fk, transaction)
            }

            const organization = await OrganizationDatabaseService.findOrganizationByUserId(id)
            if (organization) {
                await OrganizationService.deleteRelations(organization.organization_id_fk, transaction)
            }

            await user.destroy({ transaction })
        } else {
            throw ApiError.BadRequest('Неверный id!')
        }
    }
}
