import { MigrationInterface, QueryRunner } from 'typeorm';

export class QueueCounts1602788939071 implements MigrationInterface {
  name = 'QueueCounts1602788939071';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "diagnosis" ADD "waitingCountAtCreation" integer NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "diagnosis" ADD "completeCountAtCreation" integer NOT NULL DEFAULT 0`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "diagnosis" DROP COLUMN "completeCountAtCreation"`,
    );
    await queryRunner.query(
      `ALTER TABLE "diagnosis" DROP COLUMN "waitingCountAtCreation"`,
    );
  }
}
