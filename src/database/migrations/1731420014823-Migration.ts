import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731420014823 implements MigrationInterface {
    name = 'Migration1731420014823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "fabricante" (
                "id" SERIAL NOT NULL,
                "nombre" character varying(255) NOT NULL,
                "direccion" character varying NOT NULL,
                "email" character varying NOT NULL,
                "imagen" character varying NOT NULL,
                CONSTRAINT "UQ_86a08872e8e5ca25e9a069145e2" UNIQUE ("nombre"),
                CONSTRAINT "PK_3e7c3d76edc644d8d7f8d9a4670" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "pedido" (
                "id" SERIAL NOT NULL,
                "date" date NOT NULL,
                CONSTRAINT "PK_af8d8b3d07fae559c37f56b3f43" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "comprador" (
                "id" SERIAL NOT NULL,
                "nombre" character varying(255) NOT NULL,
                "apellido" character varying NOT NULL,
                "telefono" character varying NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_2174fea3473575f9d08507dbc78" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "operador" (
                "id" SERIAL NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "role" character varying NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "compradorId" integer,
                CONSTRAINT "REL_9a6bd793b4f149fb11d8692ed7" UNIQUE ("compradorId"),
                CONSTRAINT "PK_6cd1ed38785b46d815458885dfd" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "categoria" (
                "id" SERIAL NOT NULL,
                "nombre" character varying NOT NULL,
                CONSTRAINT "UQ_6771d90221138c5bf48044fd73d" UNIQUE ("nombre"),
                CONSTRAINT "PK_f027836b77b84fb4c3a374dc70d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "producto" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "nombre" character varying(255) NOT NULL,
                "descripcion" text NOT NULL,
                "precio" numeric(10, 2),
                "stock" integer NOT NULL,
                "origen" character varying NOT NULL,
                "imagen" character varying NOT NULL,
                CONSTRAINT "UQ_d86d179360134b4b74bda750664" UNIQUE ("nombre"),
                CONSTRAINT "PK_5be023b11909fe103e24c740c7d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "operador"
            ADD CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75" FOREIGN KEY ("compradorId") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "operador" DROP CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75"
        `);
        await queryRunner.query(`
            DROP TABLE "producto"
        `);
        await queryRunner.query(`
            DROP TABLE "categoria"
        `);
        await queryRunner.query(`
            DROP TABLE "operador"
        `);
        await queryRunner.query(`
            DROP TABLE "comprador"
        `);
        await queryRunner.query(`
            DROP TABLE "pedido"
        `);
        await queryRunner.query(`
            DROP TABLE "fabricante"
        `);
    }

}
