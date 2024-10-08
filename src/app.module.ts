import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FabricantesController } from './controllers/fabricantes.controller';
import { ProductosController } from './controllers/productos.controller';
import { CompradoresController } from './controllers/compradores.controller';
import { CategoriasController } from './controllers/categorias.controller';
import { PedidosController } from './controllers/pedidos.controller';
import { OperadoresController } from './controllers/operadores.controller';
import { ProductosService } from './services/productos.service';
import { CategoriasService } from './services/categorias.service';
import { PedidosService } from './services/pedidos.service';
import { CompradoresService } from './services/compradores.service';
import { FabricantesService } from './services/fabricantes.service';
import { OperadoresService } from './services/operadores.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    FabricantesController,
    ProductosController,
    CompradoresController,
    CategoriasController,
    PedidosController,
    OperadoresController,
  ],
  providers: [AppService, ProductosService, CategoriasService, PedidosService, CompradoresService, FabricantesService, OperadoresService],
})
export class AppModule {}
