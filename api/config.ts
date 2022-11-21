import { registerAs } from '@nestjs/config';
export default registerAs('config', () => {
    return {
        postgres: {
            dbName: process.env.POSTGRES_DB,
            host: process.env.POSTGRES_URL,
            port: parseInt(process.env.POSTGRES_PORT, 10),
            password: process.env.POSTGRES_PASSWORD,
            user: process.env.POSTGRES_USER,
        },
        jwtSecret: process.env.JWT_SECRET,
        postgresUrl: process.env.DATABASE_URL,
    };
});