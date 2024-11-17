import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731831908657 implements MigrationInterface {
    name = 'Migration1731831908657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "productos_categoria" (
                "categoria_id" integer NOT NULL,
                "producto_id" integer NOT NULL,
                CONSTRAINT "PK_2c3e7671dbd89b4f09357a12595" PRIMARY KEY ("categoria_id", "producto_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_63a7703bc0fe57b6ee0e4f1133" ON "productos_categoria" ("categoria_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_601d78fa3305c9af63164647f8" ON "productos_categoria" ("producto_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "categoria"
            ADD "productos" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "productos_categoria"
            ADD CONSTRAINT "FK_63a7703bc0fe57b6ee0e4f1133f" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "productos_categoria"
            ADD CONSTRAINT "FK_601d78fa3305c9af63164647f8c" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "productos_categoria" DROP CONSTRAINT "FK_601d78fa3305c9af63164647f8c"
        `);
        await queryRunner.query(`
            ALTER TABLE "productos_categoria" DROP CONSTRAINT "FK_63a7703bc0fe57b6ee0e4f1133f"
        `);
        await queryRunner.query(`
            ALTER TABLE "categoria" DROP COLUMN "productos"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_601d78fa3305c9af63164647f8"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_63a7703bc0fe57b6ee0e4f1133"
        `);
        await queryRunner.query(`
            DROP TABLE "productos_categoria"
        `);
    }

}
