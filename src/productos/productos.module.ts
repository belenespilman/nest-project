import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FabricantesController } from './controllers/fabricantes.controller';
import { CategoriasController } from './controllers/categorias.controller';
import { ProductosController } from './controllers/productos.controller';
import { ProductosService } from './services/productos.service';
import { CategoriasService } from './services/categorias.service';
import { FabricantesService } from './services/fabricantes.service';
import { Producto } from './entities/producto.entity';
import { Categoria } from './entities/categoria.entity';
import { Fabricante } from './entities/fabricante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Categoria, Fabricante])],
  controllers: [
    FabricantesController,
    ProductosController,
    CategoriasController,
  ],
  providers: [ProductosService, CategoriasService, FabricantesService],
  exports: [ProductosService],
})
export class ProductosModule {}
