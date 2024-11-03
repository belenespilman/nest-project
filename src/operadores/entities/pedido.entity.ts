import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';

import { Operador } from './operador.entity';
import { Producto } from '/productos/entities/producto.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  // @Column()
  // operador: Operador;

  // @Column()
  // productos: Producto[];

  // @ManyToOne(() => Operador, (operador) => operador.pedidos, { eager: true })
  // operador: Operador;

  // @ManyToMany(() => Producto, (producto) => producto.pedidos, { eager: true })
  // @JoinTable()
  // productos: Producto[];
}
