import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731435394570 implements MigrationInterface {
    name = 'Migration1731435394570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "fabricante"
            ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "fabricante"
            ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "producto"
            ADD "fabricanteId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "comprador" DROP COLUMN "telefono"
        `);
        await queryRunner.query(`
            ALTER TABLE "comprador"
            ADD "telefono" numeric(10, 2)
        `);
        await queryRunner.query(`
            ALTER TABLE "producto"
            ADD CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5" FOREIGN KEY ("fabricanteId") REFERENCES "fabricante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "producto" DROP CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5"
        `);
        await queryRunner.query(`
            ALTER TABLE "comprador" DROP COLUMN "telefono"
        `);
        await queryRunner.query(`
            ALTER TABLE "comprador"
            ADD "telefono" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "producto" DROP COLUMN "fabricanteId"
        `);
        await queryRunner.query(`
            ALTER TABLE "fabricante" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "fabricante" DROP COLUMN "createdAt"
        `);
    }

}
