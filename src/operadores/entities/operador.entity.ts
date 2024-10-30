import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  // @OneToMany(() => Pedido, pedido => pedido.operador)
  // pedidos: Pedido[];
}
