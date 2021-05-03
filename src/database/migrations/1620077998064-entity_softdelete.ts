import {MigrationInterface, QueryRunner} from "typeorm";

export class entitySoftdelete1620077998064 implements MigrationInterface {
    name = 'entitySoftdelete1620077998064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sections" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "students" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "subjects" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "classes" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "fiscal_year" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fiscal_year" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "deletedAt"`);
    }

}
