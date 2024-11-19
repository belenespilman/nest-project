import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
} from 'typeorm';
import { Pedido } from './pedido.entity';
import { Producto } from '../../productos/entities/producto.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'int' })
  cantidad: number;

  @ManyToOne(() => Producto)
  producto: Producto;

  @ManyToOne(() => Pedido, (pedido) => pedido.detalles)
  pedido: Pedido;
}
