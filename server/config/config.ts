import 'dotenv/config';

export const
    application = {
        domain: 'localhost',
        port: 8081,
        accessToken: 'access-token-secret-key',
        refreshToken: 'refresh-token-secret-key',
        logs: './logs',
    },
    database = {
        port: 5432,
        host: 'localhost',
        name: 'portal_d',
        user: 'postgres',
        password: 'root',
        dialect: 'postgres',
    };

