import { MigrationInterface, QueryRunner } from 'typeorm';

export class SecondMigration1710294943335 implements MigrationInterface {
  name = 'SecondMigration1710294943335';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "car" ADD "photo" text NOT NULL`);
    await queryRunner.query(
      `CREATE TYPE "public"."car_status_enum" AS ENUM('active', 'not active')`,
    );
    await queryRunner.query(
      `ALTER TABLE "car" ADD "status" "public"."car_status_enum" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "blocked" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "currency"`);
    await queryRunner.query(
      `ALTER TABLE "car" ADD "currency" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80"`,
    );
    await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "currency"`);
    await queryRunner.query(`ALTER TABLE "car" ADD "currency" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "blocked"`);
    await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."car_status_enum"`);
    await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "photo"`);
  }
}
