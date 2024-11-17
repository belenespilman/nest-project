import { Producto } from 'productos/entities/producto.entity';
import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
} from 'typeorm';
import { Pedido } from './pedido.entity';

@Entity()
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIEMSTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT:TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'int' })
  cantidad: number;

  @ManyToOne(() => Producto)
  producto: Producto;

  @ManyToOne(() => Pedido, (pedido) => pedido.detalles)
  pedido: Pedido;
}
