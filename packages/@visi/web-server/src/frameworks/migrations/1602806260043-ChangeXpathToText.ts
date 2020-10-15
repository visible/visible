import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeXpathToText1602806260043 implements MigrationInterface {
  name = 'ChangeXpathToText1602806260043';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "target"`);
    await queryRunner.query(`ALTER TABLE "report" ADD "target" text`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "target"`);
    await queryRunner.query(
      `ALTER TABLE "report" ADD "target" character varying(255)`,
    );
  }
}
