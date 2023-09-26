import { Transaction } from 'sequelize';
import { AuthService, JwtTokens } from './auth.service';


export interface AuthOptions {
    login: string;
    password: string;
    userAgent: string;
    deviceIp: string;
    role: string;
    dateExpired?: Date;
}

export interface TokenOptions {
    userId: number;
    login: string;
    role: string;
    fullName: string;
    iat?: number;
    exp?: number;
}

export interface SaveTokens {
    dateExpired: Date;
    userId: number;
    refreshToken: string;
    userAgent: string;
    deviceIp: string;
}

export interface AuthUser {
    userId: number;
    login: string;
    fullName: string;
    role: string;
}

export interface DeviceInfo {
    userAgent: string;
    deviceIp?: string;
}

export class AuthBusinessService {

    static async userLogin(authOptions: AuthOptions, transaction: Transaction): Promise<JwtTokens> {
        const userDatabase = await AuthService.checkUser(authOptions.login, authOptions.password);
        const role = await AuthService.findUserRole(userDatabase.user_role_id_fk);

        const user: AuthUser = {
            fullName: `${userDatabase.full_name}`,
            login: userDatabase.login,
            userId: userDatabase.id,
            role: role,
        };
        const tokens: JwtTokens = await AuthService.generateToken(user);

        await AuthService.saveToken(authOptions, userDatabase.id, tokens.refreshToken, transaction);

        return {
            ...tokens,
        };
    }

    static async userLogout(refreshToken: string, transaction: Transaction): Promise<void> {
        const tokenData = await AuthService.deleteToken(refreshToken, transaction);
        await AuthService.deleteUserDevice(tokenData, transaction);
    }

    static async userRefresh(refreshToken: string): Promise<JwtTokens> {
        const user = AuthService.validateRefreshToken(refreshToken);

        return AuthService.generateToken({
            fullName: user.fullName,
            login: user.login,
            userId: user.userId,
            role: user.role,
        }, refreshToken);
    }
}
