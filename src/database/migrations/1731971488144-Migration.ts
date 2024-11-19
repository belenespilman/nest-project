import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731971488144 implements MigrationInterface {
    name = 'Migration1731971488144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "operador" DROP CONSTRAINT "FK_be71bbe7720707718c5e3cb3044"
        `);
        await queryRunner.query(`
            ALTER TABLE "operador"
                RENAME COLUMN "cutomer_id" TO "customer_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "operador"
                RENAME CONSTRAINT "UQ_be71bbe7720707718c5e3cb3044" TO "UQ_58bd4b710f38bcd7d9af37e0355"
        `);
        await queryRunner.query(`
            ALTER TABLE "operador"
            ADD CONSTRAINT "FK_58bd4b710f38bcd7d9af37e0355" FOREIGN KEY ("customer_id") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "operador" DROP CONSTRAINT "FK_58bd4b710f38bcd7d9af37e0355"
        `);
        await queryRunner.query(`
            ALTER TABLE "operador"
                RENAME CONSTRAINT "UQ_58bd4b710f38bcd7d9af37e0355" TO "UQ_be71bbe7720707718c5e3cb3044"
        `);
        await queryRunner.query(`
            ALTER TABLE "operador"
                RENAME COLUMN "customer_id" TO "cutomer_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "operador"
            ADD CONSTRAINT "FK_be71bbe7720707718c5e3cb3044" FOREIGN KEY ("cutomer_id") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
