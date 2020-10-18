import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveStats1603058358537 implements MigrationInterface {
  name = 'RemoveStats1603058358537';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "diagnosis" DROP COLUMN "waitingCountAtCreation"`,
    );
    await queryRunner.query(
      `ALTER TABLE "diagnosis" DROP COLUMN "completeCountAtCreation"`,
    );
    await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "target"`);
    await queryRunner.query(`ALTER TABLE "report" ADD "target" text`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "target"`);
    await queryRunner.query(
      `ALTER TABLE "report" ADD "target" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "diagnosis" ADD "completeCountAtCreation" integer NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "diagnosis" ADD "waitingCountAtCreation" integer NOT NULL DEFAULT 0`,
    );
  }
}
