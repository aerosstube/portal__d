import { Transaction } from 'sequelize';
import { ApiError } from '../../errors/api.error';
import { Utils } from '../../utils/utils';
import { AuthUser } from '../auth-services/auth.business.service';
import { OrganizationService } from './organization.service';
import { OrganizationDatabaseService } from './organization.database.service';

export interface SaveOrganization {
    id?: number,
    workName?: string,
    fullName?: string,
    businessAddress?: string,
    physicalAddress?: string,
    inn?: string,
    kpp?: string,
    isDeleted: boolean
    externalId: string
}


export class OrganizationBusinessService {
    static async createOrganization(user: AuthUser, organizationInfo: SaveOrganization, transaction: Transaction): Promise<void> {
        Utils.checkRoleAccess(user.role);
        Utils.isDuplicate(await OrganizationService.isDuplicate(organizationInfo));

        await OrganizationService.createOrganization(user, organizationInfo, transaction);
    }

    static async updateOrganization(organizationInfo: SaveOrganization, user: AuthUser, transaction: Transaction): Promise<void> {
        Utils.checkRoleAccess(user.role);
        Utils.isDuplicate(await OrganizationService.isDuplicate(organizationInfo));

        switch (user.role) {
            case 'Администратор':
                return await OrganizationService.updateOrganization(organizationInfo, transaction);
            case 'Менеджер':
                return await OrganizationService.updateOrganization(organizationInfo, transaction, user.userId);
            default:
                throw ApiError.AccessDenied();
        }
    }

    static async delete(organizationId: number, transaction: Transaction): Promise<void> {
        const organization = await OrganizationService.getOrganizationByPK(organizationId);
        await OrganizationService.deleteRelations(organizationId, transaction);

        await organization.destroy({ transaction });
    }

    static async markDelete(userRole: string, id: number, transaction: Transaction) {
        Utils.checkRoleAccess(userRole);

        await OrganizationService.delete(id, transaction);
    }

    static async getAllOrganizations(user: AuthUser): Promise<SaveOrganization[]> {
        switch (user.role) {
            case 'Администратор':
                return await OrganizationService.createArrayDto(await OrganizationService.getAllOrganizations());
            case 'Менеджер':
                const organizationIds = await OrganizationService.getManagerOrganizations(user.userId);
                return await OrganizationService.createArrayDto(await OrganizationService.getAllOrganizations(organizationIds));
            default:
                throw ApiError.AccessDenied();
        }
    }

    static async getCurrentOrganization(user: AuthUser, id: number): Promise<SaveOrganization> {
        Utils.checkRoleAccess(user.role);
        if (user.role !== 'Администратор' && !(await OrganizationService.isManagerAccess(user.userId, id))) {
            throw ApiError.BadRequest('Менеджеру недоступна данная организация!');
        }
        return await OrganizationService.createDto(await OrganizationService.getOrganizationByPK(id));
    }

    static async getMarkedDeleted(): Promise<SaveOrganization[]> {
        return await OrganizationService.createArrayDto(await OrganizationDatabaseService.findMarkedDeleted());
    }
}
