import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1710168050359 implements MigrationInterface {
  name = 'FirstMigration1710168050359';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "car" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "model" text NOT NULL, "brand" text NOT NULL, "year" integer NOT NULL, "price" integer NOT NULL, "currency" text NOT NULL, "description" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('buyer', 'seller', 'admin', 'manager', 'dealer', 'dealer-seller', 'dealer-mechanic', 'dealer-admin', 'dealer-manager')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_typeaccount_enum" AS ENUM('basic', 'premium')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "userName" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" "public"."user_role_enum" NOT NULL, "typeAccount" "public"."user_typeaccount_enum" NOT NULL DEFAULT 'basic', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "refresh-token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "refreshToken" text NOT NULL, "deviceId" text NOT NULL, "user_id" character varying NOT NULL, CONSTRAINT "PK_62793706ec70c44e0bb5f448923" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "car" ADD CONSTRAINT "FK_c8d34198d86de9e96aae03b8990" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car" DROP CONSTRAINT "FK_c8d34198d86de9e96aae03b8990"`,
    );
    await queryRunner.query(`DROP TABLE "refresh-token"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_typeaccount_enum"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`DROP TABLE "car"`);
  }
}
