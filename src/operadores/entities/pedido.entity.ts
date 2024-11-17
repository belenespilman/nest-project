import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Operador } from './operador.entity';
import { Producto } from '/productos/entities/producto.entity';
import { Comprador } from './comprador.entity';
import { DetallePedido } from './detallePedido.entity';

@Entity()
export class Pedido {
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

  @ManyToOne(() => Comprador, (comprador) => comprador.pedidos)
  comprador: Comprador;

  @OneToMany(() => DetallePedido, (detalle) => detalle.pedido)
  detalles: DetallePedido[];

  // @ManyToOne(() => Operador, (operador) => operador.pedidos, { eager: true })
  // operador: Operador;

  // @ManyToMany(() => Producto, (producto) => producto.pedidos, { eager: true })
  // @JoinTable()
  // productos: Producto[];
}
