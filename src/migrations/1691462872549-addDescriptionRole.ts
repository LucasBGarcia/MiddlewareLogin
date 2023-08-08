import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionRole1691462872549 implements MigrationInterface {
    name = 'AddDescriptionRole1691462872549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ADD "description" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "description"`);
    }

}
