import { Transaction } from 'sequelize';
import { tokens, user_devices, user_roles } from '../../../models/init-models';
import { DeviceInfo, SaveTokens } from './auth.business.service';


export class AuthDatabaseService {
    static async findUserDeviceByUA(deviceInfo: DeviceInfo): Promise<user_devices | null> {
        return await user_devices.findOne({
            where: {
                device_ip: deviceInfo.deviceIp,
                user_agent: deviceInfo.userAgent,
            },
        });
    }

    static async createUserDevice(deviceInfo: {
        device_ip: string;
        user_agent: string
    }, transaction: Transaction): Promise<user_devices> {
        return await user_devices.create({
            device_ip: deviceInfo.device_ip,
            user_agent: deviceInfo.user_agent,
        }, { transaction });
    }

    static async findTokenByDevicePK(deviceId: number): Promise<tokens | null> {
        return await tokens.findOne({
            where: {
                user_device_id_fk: deviceId,
            },
        });
    }

    static async findTokenByPK(refreshToken: string): Promise<tokens | null> {
        return tokens.findOne({
            where: {
                refresh_token: refreshToken,
            },
        });
    }

    static async findTokenByUserPK(userId: number) {
        return await tokens.findOne({
            where: {
                user_id_fk: userId
            }
        })
    }

    static async createToken(saveToken: SaveTokens, transaction: Transaction, user_device_id: number): Promise<tokens> {
        return await tokens.create({
            user_id_fk: saveToken.userId,
            refresh_token: saveToken.refreshToken,
            date_expired: saveToken.dateExpired,
            user_device_id_fk: user_device_id,
        }, {
            transaction,
        });
    }

    static async findUserRoleById(id: number): Promise<user_roles | null> {
        return user_roles.findOne({
            where: {
                id,
            },
        });
    }

    static async findDeviceByPK(id: number): Promise<user_devices | null> {
        return user_devices.findOne({
            where: {
                id,
            },
        });
    }
}
