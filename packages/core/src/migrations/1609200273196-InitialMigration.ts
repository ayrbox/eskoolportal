import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1609200273196 implements MigrationInterface {
    name = 'InitialMigration1609200273196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "students_classId_fkey"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "students_sectionId_fkey"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "classId"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "sectionId"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "classes" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "classes" ADD CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "classes" ADD "name" character varying(200) NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "classes"."order" IS NULL`);
        await queryRunner.query(`ALTER TABLE "classes" ALTER COLUMN "order" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "classes" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "classes" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sections" DROP CONSTRAINT "PK_f9749dd3bffd880a497d007e450"`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sections" ADD CONSTRAINT "PK_f9749dd3bffd880a497d007e450" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "name" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "PK_7d7f07271ad4ce999880713f05e"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "name" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "dateOfBirth" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "students"."dateOfBirth" IS NULL`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "gender"`);
        await queryRunner.query(`CREATE TYPE "students_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`ALTER TABLE "students" ADD "gender" "students_gender_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "address" character varying(500) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "contactNo"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "contactNo" character varying(500) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "email" character varying(500) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "joinDate"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "joinDate" date`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "students_referenceCode_key"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "referenceCode"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "referenceCode" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "referenceCode"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "referenceCode" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "students_referenceCode_key" UNIQUE ("referenceCode")`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "joinDate"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "joinDate" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "email" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "contactNo"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "contactNo" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "address" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "students_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "gender" character varying(255)`);
        await queryRunner.query(`COMMENT ON COLUMN "students"."dateOfBirth" IS NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "dateOfBirth" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "name" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "PK_7d7f07271ad4ce999880713f05e"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sections" DROP CONSTRAINT "PK_f9749dd3bffd880a497d007e450"`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "sections" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sections" ADD CONSTRAINT "PK_f9749dd3bffd880a497d007e450" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "classes" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "classes" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "classes" ALTER COLUMN "order" SET DEFAULT '0'`);
        await queryRunner.query(`COMMENT ON COLUMN "classes"."order" IS NULL`);
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "classes" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "classes" DROP CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "classes" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "classes" ADD CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "students" ADD "sectionId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ADD "classId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "students_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "students_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
