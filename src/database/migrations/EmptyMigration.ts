import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmptyMigration1731827832332 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE producto_categoria (
                producto_id INT,
                categoria_id INT,
                PRIMARY KEY (producto_id, categoria_id),
                FOREIGN KEY (producto_id) REFERENCES producto(id) ON DELETE CASCADE,
                FOREIGN KEY (categoria_id) REFERENCES categoria(id) ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS producto_categoria;
        `);
  }
}
