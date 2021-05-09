import {MigrationInterface, QueryRunner} from "typeorm";

export class studentMedicalHistory1620598561987 implements MigrationInterface {
    name = 'studentMedicalHistory1620598561987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medical_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying(250) NOT NULL, "severity" character varying(20) NOT NULL, "triage_note" character varying(200) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "studentId" uuid, CONSTRAINT "PK_b74f21cb30300ddf41a00623568" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "medical_history" ADD CONSTRAINT "FK_cea2450774037c773a730f3700a" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medical_history" DROP CONSTRAINT "FK_cea2450774037c773a730f3700a"`);
        await queryRunner.query(`DROP TABLE "medical_history"`);
    }

}
