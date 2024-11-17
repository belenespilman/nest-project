import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Fabricante } from './fabricante.entity';
import { Categoria } from './categoria.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  precio: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  origen: string;

  @Column({ type: 'varchar' })
  imagen: string;

  @ManyToOne(() => Fabricante, (fabricante) => fabricante.products)
  fabricante: Fabricante;

  @ManyToMany(() => Categoria, (categoria) => categoria.productos)
  categorias: Categoria[];
}
