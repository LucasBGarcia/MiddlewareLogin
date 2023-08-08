
import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from "typeorm";
import { User } from './entities/User';
import { Role } from './entities/Role';
import { CreateRole1691462523748 } from './migrations/1691462523748-createRole';
import { AddDescriptionRole1691462872549 } from './migrations/1691462872549-addDescriptionRole';
import { AlterUserAdminNullable1691465677440 } from './migrations/1691465677440-alterUser_admin_Nullable';
import { DeleteCargoUser1691465766601 } from './migrations/1691465766601-delete_cargo_user';

const port = process.env.PORT as number | undefined;

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5433,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [User, Role],
    migrations: [CreateRole1691462523748,
        AddDescriptionRole1691462872549,
        AlterUserAdminNullable1691465677440,
        DeleteCargoUser1691465766601],
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