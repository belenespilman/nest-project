import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FabricantesController } from './controllers/fabricantes.controller';
import { ProductosController } from './controllers/productos.controller';
import { CompradoresController } from './controllers/compradores.controller';
import { CategoriasController } from './controllers/categorias.controller';
import { PedidosController } from './controllers/pedidos.controller';
import { OperadoresController } from './controllers/operadores.controller';

@Module({
  imports: [],
  controllers: [AppController, FabricantesController, ProductosController, CompradoresController, CategoriasController, PedidosController, OperadoresController],
  providers: [AppService],
})
export class AppModule {}
