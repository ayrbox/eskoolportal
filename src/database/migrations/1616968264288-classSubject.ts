import { MigrationInterface, QueryRunner } from "typeorm";

export class classSubject1616968264288 implements MigrationInterface {
  name = "classSubject1616968264288";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "subjects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying(200) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "classes_subjects_subjects" ("classesId" uuid NOT NULL, "subjectsId" uuid NOT NULL, CONSTRAINT "PK_58e3f73a660d5cff9181baa131b" PRIMARY KEY ("classesId", "subjectsId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_06ffe2a689ce795d171437e8a0" ON "classes_subjects_subjects" ("classesId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6ff4d1484c3f2b25df6c91d285" ON "classes_subjects_subjects" ("subjectsId") `
    );
    await queryRunner.query(
      `ALTER TABLE "classes_subjects_subjects" ADD CONSTRAINT "FK_06ffe2a689ce795d171437e8a00" FOREIGN KEY ("classesId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "classes_subjects_subjects" ADD CONSTRAINT "FK_6ff4d1484c3f2b25df6c91d285d" FOREIGN KEY ("subjectsId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "classes_subjects_subjects" DROP CONSTRAINT "FK_6ff4d1484c3f2b25df6c91d285d"`
    );
    await queryRunner.query(
      `ALTER TABLE "classes_subjects_subjects" DROP CONSTRAINT "FK_06ffe2a689ce795d171437e8a00"`
    );
    await queryRunner.query(`DROP INDEX "IDX_6ff4d1484c3f2b25df6c91d285"`);
    await queryRunner.query(`DROP INDEX "IDX_06ffe2a689ce795d171437e8a0"`);
    await queryRunner.query(`DROP TABLE "classes_subjects_subjects"`);
    await queryRunner.query(`DROP TABLE "subjects"`);
  }
}
