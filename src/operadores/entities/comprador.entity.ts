import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Operador } from './operador.entity';
import { Pedido } from './pedido.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Comprador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: false })
  nombre: string;

  @Column({ type: 'varchar' })
  apellido: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  telefono: number;

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

  @OneToOne(() => Operador, (operador) => operador.comprador, {
    nullable: true,
  })
  operador: Operador;

  @OneToMany(() => Pedido, (pedido) => pedido.comprador)
  pedidos: Pedido[];
}
