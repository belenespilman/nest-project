import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Comprador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  nombre: string;

  @Column({ type: 'varchar' })
  apellido: string;

  @Column({ type: 'varchar' })
  telefono: string;
}
