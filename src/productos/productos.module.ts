import { Module } from '@nestjs/common';
import { FabricantesController } from './controllers/fabricantes.controller';
import { CategoriasController } from './controllers/categorias.controller';
import { ProductosController } from './controllers/productos.controller';
import { ProductosService } from './services/productos.service';
import { CategoriasService } from './services/categorias.service';
import { FabricantesService } from './services/fabricantes.service';

@Module({
  controllers: [
    FabricantesController,
    ProductosController,
    CategoriasController,
  ],
  providers: [ProductosService, CategoriasService, FabricantesService],
})
export class ProductosModule {}
