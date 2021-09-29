import {MigrationInterface, QueryRunner} from "typeorm";

export class examSettingsAddClass1632959198909 implements MigrationInterface {
    name = 'examSettingsAddClass1632959198909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exam_settings" ADD "classId" uuid`);
        await queryRunner.query(`ALTER TABLE "exam_settings" ADD CONSTRAINT "FK_cdcea977d05682f5b5709fbbec3" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exam_settings" DROP CONSTRAINT "FK_cdcea977d05682f5b5709fbbec3"`);
        await queryRunner.query(`ALTER TABLE "exam_settings" DROP COLUMN "classId"`);
    }

}
