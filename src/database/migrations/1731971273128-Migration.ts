import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731971273128 implements MigrationInterface {
    name = 'Migration1731971273128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "producto" DROP CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5"
        `);
        await queryRunner.query(`
            ALTER TABLE "operador" DROP CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75"
        `);
        await queryRunner.query(`
            ALTER TABLE "producto"
                RENAME COLUMN "fabricanteId" TO "brand_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "operador"
                RENAME COLUMN "compradorId" TO "cutomer_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "operador"
                RENAME CONSTRAINT "REL_9a6bd793b4f149fb11d8692ed7" TO "UQ_be71bbe7720707718c5e3cb3044"
        `);
        await queryRunner.query(`
            ALTER TABLE "producto"
            ADD CONSTRAINT "FK_6c4c95a940b61bf128d3331562e" FOREIGN KEY ("brand_id") REFERENCES "fabricante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "operador"
            ADD CONSTRAINT "FK_be71bbe7720707718c5e3cb3044" FOREIGN KEY ("cutomer_id") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "operador" DROP CONSTRAINT "FK_be71bbe7720707718c5e3cb3044"
        `);
        await queryRunner.query(`
            ALTER TABLE "producto" DROP CONSTRAINT "FK_6c4c95a940b61bf128d3331562e"
        `);
        await queryRunner.query(`
            ALTER TABLE "operador"
                RENAME CONSTRAINT "UQ_be71bbe7720707718c5e3cb3044" TO "REL_9a6bd793b4f149fb11d8692ed7"
        `);
        await queryRunner.query(`
            ALTER TABLE "operador"
                RENAME COLUMN "cutomer_id" TO "compradorId"
        `);
        await queryRunner.query(`
            ALTER TABLE "producto"
                RENAME COLUMN "brand_id" TO "fabricanteId"
        `);
        await queryRunner.query(`
            ALTER TABLE "operador"
            ADD CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75" FOREIGN KEY ("compradorId") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "producto"
            ADD CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5" FOREIGN KEY ("fabricanteId") REFERENCES "fabricante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
