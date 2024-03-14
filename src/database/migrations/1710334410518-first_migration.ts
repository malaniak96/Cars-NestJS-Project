import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1710334410518 implements MigrationInterface {
  name = 'FirstMigration1710334410518';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."cars_status_enum" AS ENUM('active', 'not active')`,
    );
    await queryRunner.query(
      `CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "brand" text NOT NULL, "model" text NOT NULL, "year" integer NOT NULL, "price" integer NOT NULL, "currency" character varying NOT NULL, "description" text NOT NULL, "photo" text NOT NULL, "status" "public"."cars_status_enum" NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "refresh-token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "refreshToken" text NOT NULL, "deviceId" text NOT NULL, "user_id" character varying NOT NULL, CONSTRAINT "PK_62793706ec70c44e0bb5f448923" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('buyer', 'seller', 'admin', 'manager', 'dealer', 'dealer-seller', 'dealer-mechanic', 'dealer-admin', 'dealer-manager')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_typeaccount_enum" AS ENUM('basic', 'premium')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "userName" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" "public"."users_role_enum" NOT NULL, "typeAccount" "public"."users_typeaccount_enum" NOT NULL DEFAULT 'basic', "blocked" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cars" ADD CONSTRAINT "FK_673bd295e52580c0fb09d0fbbb8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cars" DROP CONSTRAINT "FK_673bd295e52580c0fb09d0fbbb8"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_typeaccount_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "refresh-token"`);
    await queryRunner.query(`DROP TABLE "cars"`);
    await queryRunner.query(`DROP TYPE "public"."cars_status_enum"`);
  }
}
