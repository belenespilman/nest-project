import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731970956456 implements MigrationInterface {
    name = 'Migration1731970956456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX "IDX_c3bdec19983950497f2ff61589" ON "producto" ("precio")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IDX_c3bdec19983950497f2ff61589"
        `);
    }

}
