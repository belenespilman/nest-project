import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { Comprador } from './comprador.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Operador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  role: string;

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

  @OneToOne(() => Comprador, (comprador) => comprador.operador, {
    nullable: true,
  })
  @JoinColumn({ name: 'customer_id' })
  comprador: Comprador;

  @RelationId((operador: Operador) => operador.comprador)
  compradorId: number;
}
