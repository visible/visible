import { MigrationInterface, QueryRunner } from 'typeorm';

export class RuleKeywords1600108045792 implements MigrationInterface {
  name = 'RuleKeywords1600108045792';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rule" ADD "keywords" json`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rule" DROP COLUMN "keywords"`);
  }
}
