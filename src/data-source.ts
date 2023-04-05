import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from "typeorm";
import { User } from './entities/User'
import { default1680698893609 } from './migrations/1680698893609-default'
const port = process.env.PORT as number | undefined;

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: process.env.DB_PASS,
    database: '',
    entities: [User],
    migrations: [default1680698893609],
});