import {MigrationInterface, QueryRunner} from "typeorm";

export class grades1628730157446 implements MigrationInterface {
    name = 'grades1628730157446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "grades" ("gradeType" character varying(20) NOT NULL, "fullMark" numeric NOT NULL, "passMark" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "yearId" uuid NOT NULL, "examId" uuid NOT NULL, "classId" uuid NOT NULL, "subjectId" uuid NOT NULL, CONSTRAINT "PK_d20657449cedcf19e5dc2e7216a" PRIMARY KEY ("yearId", "examId", "classId", "subjectId"))`);
        await queryRunner.query(`CREATE TABLE "students_grade" ("fullMark" numeric NOT NULL, "passMark" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "studentId" uuid NOT NULL, "yearId" uuid NOT NULL, "examId" uuid NOT NULL, "classId" uuid NOT NULL, "subjectId" uuid NOT NULL, CONSTRAINT "PK_dc494f6f995473e727830156b84" PRIMARY KEY ("studentId", "yearId", "examId", "classId", "subjectId"))`);
        await queryRunner.query(`ALTER TABLE "grades" ADD CONSTRAINT "FK_1bf8519797aaf6e3c96407c5b42" FOREIGN KEY ("yearId") REFERENCES "fiscal_year"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grades" ADD CONSTRAINT "FK_563e5b5ef952e7a90e2491b60fa" FOREIGN KEY ("examId") REFERENCES "exams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grades" ADD CONSTRAINT "FK_c4d7616c578690cc154b70a83c4" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grades" ADD CONSTRAINT "FK_53072aa77cf53aec5463b9b3505" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students_grade" ADD CONSTRAINT "FK_7791e56d806ed527fc70e1c930d" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students_grade" ADD CONSTRAINT "FK_ba49909d59323a14ac3f27eacbc" FOREIGN KEY ("yearId") REFERENCES "fiscal_year"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students_grade" ADD CONSTRAINT "FK_a3ccbbb8232f1bcf7d5e8361255" FOREIGN KEY ("examId") REFERENCES "exams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students_grade" ADD CONSTRAINT "FK_0ba503e876229e5fb052fad6327" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students_grade" ADD CONSTRAINT "FK_9d9f4d1df9ddd022a1fa94308bd" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students_grade" DROP CONSTRAINT "FK_9d9f4d1df9ddd022a1fa94308bd"`);
        await queryRunner.query(`ALTER TABLE "students_grade" DROP CONSTRAINT "FK_0ba503e876229e5fb052fad6327"`);
        await queryRunner.query(`ALTER TABLE "students_grade" DROP CONSTRAINT "FK_a3ccbbb8232f1bcf7d5e8361255"`);
        await queryRunner.query(`ALTER TABLE "students_grade" DROP CONSTRAINT "FK_ba49909d59323a14ac3f27eacbc"`);
        await queryRunner.query(`ALTER TABLE "students_grade" DROP CONSTRAINT "FK_7791e56d806ed527fc70e1c930d"`);
        await queryRunner.query(`ALTER TABLE "grades" DROP CONSTRAINT "FK_53072aa77cf53aec5463b9b3505"`);
        await queryRunner.query(`ALTER TABLE "grades" DROP CONSTRAINT "FK_c4d7616c578690cc154b70a83c4"`);
        await queryRunner.query(`ALTER TABLE "grades" DROP CONSTRAINT "FK_563e5b5ef952e7a90e2491b60fa"`);
        await queryRunner.query(`ALTER TABLE "grades" DROP CONSTRAINT "FK_1bf8519797aaf6e3c96407c5b42"`);
        await queryRunner.query(`DROP TABLE "students_grade"`);
        await queryRunner.query(`DROP TABLE "grades"`);
    }

}
