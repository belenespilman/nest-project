import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Producto } from './producto.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  nombre: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ManyToMany(() => Producto, (producto) => producto.categorias)
  @JoinTable({
    name: 'productos_categoria',
    joinColumn: { name: 'categoria_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'producto_id', referencedColumnName: 'id' },
  })
  productos: Producto[];
}
