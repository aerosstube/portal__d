import { Transaction, or } from 'sequelize';
import { organizations } from '../../../models/init-models';
import { ApiError } from '../../errors/api.error';
import { AuthUser } from '../auth-services/auth.business.service';
import { SaveOrganization } from './organization.business.service';
import { OrganizationDatabaseService } from './organization.database.service';
import { OrderService } from '../order-services/order.service';


export class OrganizationService {
    static async createOrganization(user: AuthUser, organizationInfo: SaveOrganization, transaction: Transaction): Promise<void> {
        const organization = await OrganizationDatabaseService.createOrganization(organizationInfo, transaction);
        if (user.role === 'Менеджер') {
            await OrganizationDatabaseService.addManagerAccess(user.userId, organization.id, transaction);
        }
    }

    static async addManagerAccess(userId: number, organizationIds: any, transaction: Transaction) {
        const organizationHasUser = await OrganizationDatabaseService.findAllOrganizationHasUserByUserId(userId)
        for (const organization of organizationHasUser) {
            await organization.destroy({ transaction })
        }
        if (organizationIds)
            for (let i = 0; i < organizationIds.length; i++) {
                await OrganizationDatabaseService.addManagerAccess(userId, parseInt(organizationIds[i]), transaction)
            }
    }

    static async updateOrganization(organizationInfo: SaveOrganization, transaction: Transaction, userId: number = null): Promise<void> {
        if (userId !== null && !(await this.isManagerAccess(userId, organizationInfo.id))) {
            throw ApiError.BadRequest('Менеджеру недоступна данная организация!');
        }

        const organization = await this.getOrganizationByPK(organizationInfo.id);

        organization.inn = organizationInfo.inn;
        organization.kpp = organizationInfo.kpp;
        organization.business_address = organizationInfo.businessAddress;
        organization.physical_address = organizationInfo.physicalAddress;
        organization.full_name = organizationInfo.fullName;
        organization.work_name = organizationInfo.workName;

        await organization.save({ transaction });
    }

    static async delete(id: number, transaction: Transaction) {
        const organization = await this.getOrganizationByPK(id);

        organization.is_deleted = !organization.is_deleted;

        await organization.save({ transaction });
    }

    static async deleteRelations(organizationId: number, transaction: Transaction) {
        const findOption = {
            where: {
                organization_id_fk: organizationId,
            },
        };

        const orders = await OrderService.getOrdersBySomeId(findOption);
        for (let i = 0; i < orders.length; i++) {
            orders[i].organization_id_fk = null;
            await orders[i].save({ transaction });
        }

        const organizationHasUsers = await OrganizationDatabaseService.findOrganizationHasUserByOrganizationId(organizationId);
        for (let i = 0; i < organizationHasUsers.length; i++) {
            await organizationHasUsers[i].destroy({ transaction });
        }
    };

    static async getManagerOrganizations(userId: number): Promise<number[]> {
        const organizationIds = await OrganizationDatabaseService.findManagerOrganizations(userId);
        const res = organizationIds.map(({ organization_id_fk }) => organization_id_fk);

        if (res.length === 0) {
            throw ApiError.BadRequest('У менеджера нет доступных организаций!');
        }

        return res;
    }

    static async getOrganizationByPK(id: number): Promise<organizations> {
        const organization = await OrganizationDatabaseService.findOrganizationByPK(id);
        if (!organization) {
            throw ApiError.BadRequest('Такой организации не существует!');
        }

        return organization;
    }

    static async getAllOrganizations(organizationIds: number[] = null): Promise<organizations[]> {
        const organizations = await OrganizationDatabaseService.findAllOrganizations(organizationIds);

        if (organizations.length === 0) {
            throw ApiError.BadRequest('Таких организаций не существует, либо у вас нет доступа к организациям!');
        }

        return organizations;
    }

    static async isDuplicate(organizationInfo: SaveOrganization): Promise<boolean> {
        return !!(await (OrganizationDatabaseService.findDuplicate(organizationInfo)));
    }

    static async isManagerAccess(userId: number, organizationId: number) {
        const managerOrganizations = await this.getManagerOrganizations(userId);
        for (let i = 0; i < managerOrganizations.length; i++) {
            if (managerOrganizations[i] === organizationId) {
                return true;
            }
        }
        return false;
    }


    static async createArrayDto(organization: organizations[]): Promise<SaveOrganization[]> {
        const organizations = [];
        for (let i = 0; i < organization.length; i++) {
            organizations.push({
                id: organization[i].id,
                workName: organization[i].work_name,
                fullName: organization[i].full_name,
                businessAddress: organization[i].business_address,
                physicalAddress: organization[i].physical_address,
                inn: organization[i].inn,
                kpp: organization[i].kpp,
                isDeleted: organization[i].is_deleted,
            });
        }
        return organizations;

    }

    static async createDto(organization: organizations): Promise<SaveOrganization> {
        return {
            id: organization.id,
            workName: organization.work_name,
            fullName: organization.full_name,
            businessAddress: organization.business_address,
            physicalAddress: organization.physical_address,
            inn: organization.inn,
            kpp: organization.kpp,
            isDeleted: organization.is_deleted,
            externalId: organization.external_id
        };
    }


}
