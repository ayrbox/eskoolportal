import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1609200992868 implements MigrationInterface {
  name = 'InitialMigration1609200992868';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "classes" ("id" character varying NOT NULL, "name" character varying(200) NOT NULL, "order" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "sections" ("id" character varying NOT NULL, "name" character varying(200) NOT NULL, "order" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f9749dd3bffd880a497d007e450" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "students_gender_enum" AS ENUM('male', 'female')`
    );
    await queryRunner.query(
      `CREATE TABLE "students" ("id" character varying NOT NULL, "name" character varying(200) NOT NULL, "dateOfBirth" date NOT NULL, "gender" "students_gender_enum" NOT NULL, "address" character varying(500) NOT NULL, "contactNo" character varying(500) NOT NULL, "email" character varying(500) NOT NULL, "joinDate" date, "rollno" integer, "referenceCode" character varying(10) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" character varying NOT NULL, "name" character varying(200) NOT NULL, "email" character varying(250) NOT NULL, "password" character varying(256) NOT NULL, "avatar" character varying(1000) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "students"`);
    await queryRunner.query(`DROP TYPE "students_gender_enum"`);
    await queryRunner.query(`DROP TABLE "sections"`);
    await queryRunner.query(`DROP TABLE "classes"`);
  }
}
