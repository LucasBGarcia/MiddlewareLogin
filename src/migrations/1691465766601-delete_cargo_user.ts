import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteCargoUser1691465766601 implements MigrationInterface {
    name = 'DeleteCargoUser1691465766601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cargo"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "cargo" text NOT NULL`);
    }

}
