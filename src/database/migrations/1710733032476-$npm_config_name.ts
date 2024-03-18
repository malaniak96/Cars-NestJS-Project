import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1710733032476 implements MigrationInterface {
  name = ' $npmConfigName1710733032476';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."cars_status_enum" AS ENUM('not active', 'active')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."cars_region_enum" AS ENUM('Cherkasy', 'Chernihiv', 'Chernivtsi', 'Dnipropetrovsk', 'Donetsk', 'Ivano-Frankivsk', 'Kharkiv', 'Kherson', 'Khmelnytskyi', 'Kirovohrad', 'Kyiv', 'Luhansk', 'Lviv', 'Mykolaiv', 'Odesa', 'Poltava', 'Rivne', 'Sumy', 'Ternopil', 'Vinnytsia', 'Volyn', 'Zakarpattia', 'Zaporizhzhia', 'Zhytomyr', 'Sevastopol City', 'Kyiv City', 'Crimea')`,
    );
    await queryRunner.query(
      `CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "title" text NOT NULL, "marka" text NOT NULL, "model" text NOT NULL, "year" integer NOT NULL, "price" integer NOT NULL, "currency" character varying NOT NULL, "UAH" numeric(10,2), "EUR" numeric(10,2), "USD" numeric(10,2), "usdExchangeRate" numeric(10,2), "eurExchangeRate" numeric(10,2), "description" text NOT NULL, "photo" text NOT NULL, "status" "public"."cars_status_enum" NOT NULL DEFAULT 'not active', "region" "public"."cars_region_enum" NOT NULL, "totalViews" integer NOT NULL DEFAULT '0', "viewsToday" integer NOT NULL DEFAULT '0', "viewsThisWeek" integer NOT NULL DEFAULT '0', "viewsThisMonth" integer NOT NULL DEFAULT '0', "user_id" uuid NOT NULL, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`,
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
      `CREATE TABLE "refresh-token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "refreshToken" text NOT NULL, "deviceId" text NOT NULL, "user_id" character varying NOT NULL, CONSTRAINT "PK_62793706ec70c44e0bb5f448923" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "car-models" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "model" text NOT NULL, "marka_id" uuid NOT NULL, CONSTRAINT "PK_5ead90ac2e06122719417b2bcf9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "car-brands" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "marka" text NOT NULL, CONSTRAINT "PK_e4da449428ce7797e25c732a520" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "cars" ADD CONSTRAINT "FK_673bd295e52580c0fb09d0fbbb8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "car-models" ADD CONSTRAINT "FK_4d16711f87e71ef3df42c3db56e" FOREIGN KEY ("marka_id") REFERENCES "car-brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "car-models" DROP CONSTRAINT "FK_4d16711f87e71ef3df42c3db56e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cars" DROP CONSTRAINT "FK_673bd295e52580c0fb09d0fbbb8"`,
    );
    await queryRunner.query(`DROP TABLE "car-brands"`);
    await queryRunner.query(`DROP TABLE "car-models"`);
    await queryRunner.query(`DROP TABLE "refresh-token"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_typeaccount_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TABLE "cars"`);
    await queryRunner.query(`DROP TYPE "public"."cars_region_enum"`);
    await queryRunner.query(`DROP TYPE "public"."cars_status_enum"`);
  }
}
