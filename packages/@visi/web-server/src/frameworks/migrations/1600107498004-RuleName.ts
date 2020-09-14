import { MigrationInterface, QueryRunner } from 'typeorm';

export class RuleName1600107498004 implements MigrationInterface {
  name = 'RuleName1600107498004';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rule" ADD "coreId" character varying(255) NOT NULL DEFAULT 'unknown'`,
    );
    await queryRunner.query(
      `ALTER TABLE "report" ADD "impact" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "report" ADD "difficulty" character varying(255)`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1f148b477952f45e81e1bb624a" ON "rule" ("coreId") `,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_1f148b477952f45e81e1bb624a"`);
    await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "difficulty"`);
    await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "impact"`);
    await queryRunner.query(`ALTER TABLE "rule" DROP COLUMN "coreId"`);
  }
}
