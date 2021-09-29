import {MigrationInterface, QueryRunner} from "typeorm";

export class examSettings1632958890284 implements MigrationInterface {
    name = 'examSettings1632958890284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exam_settings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "examType" character varying(50), "fullMark" numeric NOT NULL, "passMark" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "examId" uuid, "subjectId" uuid, CONSTRAINT "PK_7168e9fdabf0b6a70cc9d5a7e5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "exams" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "exams" ADD "startDate" date`);
        await queryRunner.query(`ALTER TABLE "exams" ADD "endDate" date`);
        await queryRunner.query(`ALTER TABLE "exams" ADD "note" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "exams" ADD "yearId" uuid`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_17a32b4fddb41f064b8a2053ce5" FOREIGN KEY ("yearId") REFERENCES "fiscal_year"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exam_settings" ADD CONSTRAINT "FK_2060c1f7a3a820abe5e4a72343a" FOREIGN KEY ("examId") REFERENCES "exams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exam_settings" ADD CONSTRAINT "FK_bdcd8491e3cd26d25cd8ac22249" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exam_settings" DROP CONSTRAINT "FK_bdcd8491e3cd26d25cd8ac22249"`);
        await queryRunner.query(`ALTER TABLE "exam_settings" DROP CONSTRAINT "FK_2060c1f7a3a820abe5e4a72343a"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_17a32b4fddb41f064b8a2053ce5"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP COLUMN "yearId"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP COLUMN "note"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP COLUMN "endDate"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP COLUMN "startDate"`);
        await queryRunner.query(`ALTER TABLE "exams" ADD "description" character varying(200) NOT NULL`);
        await queryRunner.query(`DROP TABLE "exam_settings"`);
    }

}
