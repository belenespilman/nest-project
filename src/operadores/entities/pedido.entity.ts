import { Operador } from './operador.entity';
import { Producto } from 'src/productos/entities/producto.entity';

export class Pedido {
  date: string;
  operador: Operador;
  products: Producto[];
}
