import { randomInt } from 'crypto';
import { Transaction } from 'sequelize';
import { organizations, organizations_has_users } from '../../../models/init-models';
import { SaveOrganization } from './organization.business.service';


export class OrganizationDatabaseService {
    static async findAllOrganizationHasUserByUserId(userId: number): Promise<organizations_has_users[]> {
        return await organizations_has_users.findAll({
            where: {
                user_id_fk: userId
            }
        })
    }
    static async findOrganizationHasUserDuplicate(organizationId: number, userId: number) {
        return await organizations_has_users.findOne({
            where: {
                organization_id_fk: organizationId,
                user_id_fk: userId
            }
        })
    }
    static async findOrganizationByUserId(userId: number) {
        return await organizations_has_users.findOne({
            where: {
                user_id_fk: userId
            }
        })
    }

    static async findManagerOrganizations(userId: number): Promise<organizations_has_users[]> {
        return await organizations_has_users.findAll({
            where: {
                user_id_fk: userId,
            },
            attributes: ['organization_id_fk'],
            raw: true,
        });
    }

    static async findDuplicate(organizationInfo: SaveOrganization): Promise<organizations | null> {
        return await organizations.findOne({
            where: {
                full_name: organizationInfo.fullName,
                work_name: organizationInfo.workName,
                business_address: organizationInfo.businessAddress,
                physical_address: organizationInfo.physicalAddress,
                inn: organizationInfo.inn,
                kpp: organizationInfo.kpp,
            },
        });
    }

    static async findAllOrganizations(organizationIds: number[] = null): Promise<organizations[]> {
        if (organizationIds === null) {
            return await organizations.findAll();
        } else {
            return await organizations.findAll({
                where: {
                    id: organizationIds,
                },
                order: [
                    ['id', 'ASC'],
                ],
                raw: true,
            });
        }
    }

    static async findOrganizationByPK(id: number): Promise<organizations | null> {
        return await organizations.findOne({
            where: {
                id: id,
            },
        });
    }

    static async findOrganizationHasUserByOrganizationId(organizationId: number) {
        return await organizations_has_users.findAll({
            where:
                { organization_id_fk: organizationId },
        });
    }

    static async createOrganization(organizationInfo: SaveOrganization, transaction: Transaction) {
        return await organizations.create({
            external_id: organizationInfo.externalId ? organizationInfo.externalId : String(randomInt(1, 1099999)),
            work_name: organizationInfo.workName,
            business_address: organizationInfo.businessAddress,
            physical_address: organizationInfo.physicalAddress,
            inn: organizationInfo.inn,
            kpp: organizationInfo.kpp,
            full_name: organizationInfo.fullName,
        }, {
            raw: true,
            transaction,
        });
    }

    static async addManagerAccess(userId: number, organizationId: number, transaction: Transaction) {
        return await organizations_has_users.create({
            user_id_fk: userId,
            organization_id_fk: organizationId,
        }, { transaction });
    }


    static async findMarkedDeleted() {
        return organizations.findAll({
            where: {
                is_deleted: true,
            },
        });
    }
}
