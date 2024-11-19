import {
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comprador } from './comprador.entity';
import { DetallePedido } from './detallePedido.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Pedido {
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

  @ManyToOne(() => Comprador, (comprador) => comprador.pedidos)
  comprador: Comprador;

  @Exclude()
  @OneToMany(() => DetallePedido, (detalle) => detalle.pedido)
  detalles: DetallePedido[];

  @Expose()
  get products() {
    if (this.detalles) {
      return this.detalles
        .filter((detalle) => !!detalle)
        .map((detalle) => ({
          ...detalle.producto,
          cantidad: detalle.cantidad,
        }));
    }
    return [];
  }

  @Expose()
  get total() {
    if (this.detalles) {
      return this.detalles
        .filter((detalle) => !!detalle)
        .reduce((total, detalle) => {
          const totalDetalle = detalle.producto.precio + detalle.cantidad;
          return total + totalDetalle;
        }, 0);
    }
    return 0;
  }
}
