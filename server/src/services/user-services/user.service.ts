import { users } from '../../../models/users';
import { ApiError } from '../../errors/api.error';
import { UserDatabaseService } from './user.database.service';
import { UserOptions } from './user.business.service';
import { user_roles } from '../../../models/user_roles';
import { clients_has_users } from '../../../models/clients_has_users';
import { OrganizationService } from '../organization-services/organization.service';
import { ClientService } from '../client-services/client.service';
import { OrganizationDatabaseService } from '../organization-services/organization.database.service';
import { ClientDatabaseService } from '../client-services/client.database.service';


export class UserService {

    static async findByLogin(login: string): Promise<users> {
        const user: users | null = await UserDatabaseService.findUserByLogin(login);

        if (!user)
            throw ApiError.BadRequest('Ошибка пользователя!');

        return user;
    }

    static async getAll(): Promise<users[]> {
        return await users.findAll({ raw: true });
    }

    static async createArrayDto(user: users[]): Promise<UserOptions[]> {
        const users: UserOptions[] = [];
        for (let i = 0; i < user.length; i++) {
            users.push({
                id: user[i].id,
                email: user[i].email,
                externalId: user[i].external_id,
                fullName: user[i].full_name,
                login: user[i].login,
                password: user[i].password,
                user_role_id_fk: (await user_roles.findOne({ where: { id: user[i].user_role_id_fk } })) ? await user_roles.findOne({ where: { id: user[i].user_role_id_fk } }) : null,
                organizationHasUser: (await OrganizationDatabaseService.findManagerOrganizations(user[i].id)).map(({ organization_id_fk }) => organization_id_fk),
                clientHasUser: (await ClientDatabaseService.findManagerClients(user[i].id)).map(({ client_id_fk }) => client_id_fk)
            });
        }
        return users;
    }

    static async createDto(user: users): Promise<UserOptions> {
        return {
            id: user.id,
            email: user.email,
            externalId: user.external_id,
            fullName: user.full_name,
            login: user.login,
            password: user.password,
            user_role_id_fk: (await user_roles.findOne({ where: { id: user.user_role_id_fk } })) ? await user_roles.findOne({ where: { id: user.user_role_id_fk } }) : null,
        };
    }


    static async getById(id: number) {
        const user: users | null = await UserDatabaseService.findById(id);

        if (!user)
            throw ApiError.BadRequest('Ошибка пользователя!');

        return user;
    }
}
