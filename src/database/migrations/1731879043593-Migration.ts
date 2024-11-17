import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731879043593 implements MigrationInterface {
    name = 'Migration1731879043593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido" DROP CONSTRAINT "detalle_pedido_producto_id_fkey"
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido" DROP CONSTRAINT "detalle_pedido_pedido_id_fkey"
        `);
        await queryRunner.query(`
            ALTER TABLE "pedido" DROP CONSTRAINT "fk_comprador"
        `);
        await queryRunner.query(`
            ALTER TABLE "comprador" DROP CONSTRAINT "fk_operador"
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido" DROP COLUMN "created_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido" DROP COLUMN "producto_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido" DROP COLUMN "pedido_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "pedido" DROP COLUMN "date"
        `);
        await queryRunner.query(`
            ALTER TABLE "pedido" DROP COLUMN "comprador_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "comprador" DROP COLUMN "operador_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido"
            ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido"
            ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido"
            ADD "productoId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido"
            ADD "pedidoId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "pedido"
            ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "pedido"
            ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "pedido"
            ADD "compradorId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido"
            ADD CONSTRAINT "FK_aa6bb17cb0e47d62ace803293eb" FOREIGN KEY ("productoId") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido"
            ADD CONSTRAINT "FK_4d39e79d693b68f9f35cf4238e1" FOREIGN KEY ("pedidoId") REFERENCES "pedido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "pedido"
            ADD CONSTRAINT "FK_0d3726ab0e7395e7ffc159dbbbf" FOREIGN KEY ("compradorId") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "pedido" DROP CONSTRAINT "FK_0d3726ab0e7395e7ffc159dbbbf"
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido" DROP CONSTRAINT "FK_4d39e79d693b68f9f35cf4238e1"
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido" DROP CONSTRAINT "FK_aa6bb17cb0e47d62ace803293eb"
        `);
        await queryRunner.query(`
            ALTER TABLE "pedido" DROP COLUMN "compradorId"
        `);
        await queryRunner.query(`
            ALTER TABLE "pedido" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "pedido" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido" DROP COLUMN "pedidoId"
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido" DROP COLUMN "productoId"
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "comprador"
            ADD "operador_id" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "pedido"
            ADD "comprador_id" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "pedido"
            ADD "date" date NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido"
            ADD "pedido_id" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido"
            ADD "producto_id" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido"
            ADD "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido"
            ADD "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        `);
        await queryRunner.query(`
            ALTER TABLE "comprador"
            ADD CONSTRAINT "fk_operador" FOREIGN KEY ("operador_id") REFERENCES "operador"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "pedido"
            ADD CONSTRAINT "fk_comprador" FOREIGN KEY ("comprador_id") REFERENCES "comprador"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido"
            ADD CONSTRAINT "detalle_pedido_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedido"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "detalle_pedido"
            ADD CONSTRAINT "detalle_pedido_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
