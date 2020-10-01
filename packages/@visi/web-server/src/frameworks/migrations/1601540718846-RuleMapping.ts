import { MigrationInterface, QueryRunner } from 'typeorm';

export class RuleMapping1601540718846 implements MigrationInterface {
  name = 'RuleMapping1601540718846';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rule" ADD "mapping" json`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rule" DROP COLUMN "mapping"`);
  }
}
