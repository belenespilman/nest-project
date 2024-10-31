import {MigrationInterface, QueryRunner} from "typeorm";

export class updatedatecolumn1730405350703 implements MigrationInterface {
    name = 'updatedatecolumn1730405350703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "updatedAt"`);
    }

}
