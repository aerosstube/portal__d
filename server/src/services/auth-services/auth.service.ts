import * as jwt from 'jsonwebtoken';
import { Transaction } from 'sequelize';
import { application } from '../../../config/config';
import { tokens, user_devices } from '../../../models/init-models';
import { users } from '../../../models/users';
import { ApiError } from '../../errors/api.error';
import { UserService } from '../user-services/user.service';
import { AuthOptions, AuthUser, DeviceInfo, SaveTokens, TokenOptions } from './auth.business.service';
import { AuthDatabaseService } from './auth.database.service';


export interface JwtTokens {
    refreshToken: string;
    accessToken: string;
}

export class AuthService {

    static async checkUser(login: string, password: string): Promise<users> {
        const user: users = await UserService.findByLogin(login);
        // const isPassword = await compare(password, user.password);

        const isPassword = password === user.password ? true : false;

        if (!isPassword)
            throw ApiError.BadRequest('Ошибка авторизации!');

        return user;
    }

    static validateRefreshToken(refreshToken: string): TokenOptions {
        try {
            const payload = jwt.verify(refreshToken, application.refreshToken);
            // @ts-ignore
            return Object.assign(payload);
        } catch (e) {
            throw ApiError.UnauthorizedError();
        }
    }

    static async generateToken(payload: AuthUser, refreshToken: string = null): Promise<JwtTokens> {
        return {
            refreshToken: (refreshToken) ? refreshToken : jwt.sign(payload, application.refreshToken, { expiresIn: '30d' }),
            accessToken: jwt.sign(payload, application.accessToken, { expiresIn: '15d' }),
        };
    }

    static async findUserRole(user_role_id_fk: number): Promise<string> {
        let role = await AuthDatabaseService.findUserRoleById(user_role_id_fk);
        if (!role) {
            throw ApiError.BadRequest('Проблема авторизации (не смог найти роль)!');
        }

        return role.role;
    }

    static async createDeviceInfo(saveToken: SaveTokens, transaction: Transaction): Promise<user_devices> {
        const deviceInfo: DeviceInfo = {
            userAgent: saveToken.userAgent,
            deviceIp: saveToken.deviceIp,
        };

        let deviceData: user_devices | null = await AuthDatabaseService.findUserDeviceByUA(deviceInfo);
        if (!deviceData) {
            return await AuthDatabaseService.createUserDevice({
                device_ip: saveToken.deviceIp,
                user_agent: saveToken.userAgent,
            }, transaction);
        }

        return deviceData;
    }

    static async createTokenData(deviceId: number, saveToken: SaveTokens, transaction: Transaction): Promise<tokens> {
        const tokenData: tokens | null = await AuthDatabaseService.findTokenByDevicePK(deviceId);
        if (!tokenData)
            return await AuthDatabaseService.createToken(saveToken, transaction, deviceId);
        return tokenData;
    }

    static async updateRefreshToken(tokenData: tokens, refreshToken, transaction: Transaction): Promise<void> {
        tokenData.refresh_token = refreshToken;
        await tokenData.save({ transaction });
    }

    static async saveToken(authOptions: AuthOptions, user_id: number, refreshToken: string, transaction: Transaction): Promise<void> {
        try {
            const dateExpired: Date = new Date();
            dateExpired.setDate(dateExpired.getDate() + 30);

            const saveToken: SaveTokens = {
                userId: user_id,
                refreshToken: refreshToken,
                userAgent: authOptions.userAgent,
                dateExpired: dateExpired,
                deviceIp: authOptions.deviceIp,
            };

            const deviceData = await this.createDeviceInfo(saveToken, transaction);
            const tokenData = await this.createTokenData(deviceData.id, saveToken, transaction);

            await this.updateRefreshToken(tokenData, saveToken.refreshToken, transaction);
        } catch (err) {
            throw ApiError.BadRequest('Ошибка авторизации!');
        }
    }

    static async deleteToken(refreshToken: string, transaction: Transaction): Promise<number> {
        try {
            const tokenData = await AuthDatabaseService.findTokenByPK(refreshToken);
            await tokenData.destroy({ transaction });
            return tokenData.user_device_id_fk;
        } catch (e) {
            throw ApiError.UnauthorizedError();
        }
    }

    static async deleteUserDevice(user_device_id_pk: number, transaction: Transaction): Promise<void> {
        const deviceData = await AuthDatabaseService.findDeviceByPK(user_device_id_pk);
        if (deviceData === null)
            throw ApiError.UnauthorizedError();

        await deviceData.destroy({ transaction });
    }

    static validateAccessToken(accessToken: string): TokenOptions {
        try {
            const tokenPayload = jwt.verify(accessToken, application.accessToken);
            // @ts-ignore
            return Object.assign(tokenPayload);
        } catch (err) {
            throw ApiError.UnauthorizedError();
        }
    }

}