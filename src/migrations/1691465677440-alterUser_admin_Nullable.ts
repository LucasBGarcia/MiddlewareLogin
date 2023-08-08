import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserAdminNullable1691465677440 implements MigrationInterface {
    name = 'AlterUserAdminNullable1691465677440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "admin_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "admin_id" SET NOT NULL`);
    }

}
