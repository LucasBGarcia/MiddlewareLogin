
import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from "typeorm";
import { User } from './entities/User';

const port = process.env.PORT as number | undefined;

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5433,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [User],
    migrations: [],
});

// export const AppDataSource = new DataSource({
//     type: 'postgres',
//     host: 'localhost',
//     port: 5433,
//     username: 'postgres',
//     password: process.env.DB_PASS,
//     database: 'bruno',
//     entities: [User],
//     migrations: [],
// });