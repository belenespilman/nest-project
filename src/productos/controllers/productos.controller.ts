import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ParseIntPipe } from '/common/parse-int.pipe';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '/productos/dtos/productos.dto';
import { ProductosService } from 'productos/services/productos.service';
import { Producto } from 'productos/entities/producto.entity';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private productosService: ProductosService) {}

  @Get()
  @ApiOperation({ summary: 'Catálogo con todos los productos' })
  @HttpCode(HttpStatus.ACCEPTED)
  getAllProducts(@Query() params: FilterProductDto): any {
    return this.productosService.findAll(params);
  }

  @Get('/:idProduct')
  @ApiOperation({ summary: 'Obtener producto por ID' })
  @HttpCode(HttpStatus.ACCEPTED)
  getProductById(@Param('idProduct', ParseIntPipe) idProduct: number): any {
    return this.productosService.findOne(idProduct);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un producto' })
  createProducto(
    @Body() payload: Omit<CreateProductDto, 'createdAt' | 'updatedAt'>,
  ): any {
    return this.productosService.createProduct(payload);
  }

  @Put('/:idProduct')
  @ApiOperation({ summary: 'Modificar/Actualizar un producto por ID' })
  updateProduct(
    @Param('idProduct', ParseIntPipe) idProduct: string,
    @Body() body: UpdateProductDto,
  ): any {
    return this.productosService.updateProduct(+idProduct, body);
  }

  @Put(':id/categorias/:categoriaId')
  @ApiOperation({ summary: 'Añadir categoria a un producto' })
  addCategory(
    @Param('id') id: number,
    @Param('categoriaId') categoriaId: number,
  ) {
    return this.productosService.addCategoryToProduct(id, categoriaId);
  }

  @Delete(':id/categorias/:categoriaId')
  @ApiOperation({ summary: 'Eliminar categoria de un producto' })
  removeCategory(
    @Param('id') id: number,
    @Param('categoriaId') categoriaId: number,
  ) {
    return this.productosService.removeCategoryFromProduct(id, categoriaId);
  }

  @Delete('/:idProduct')
  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  deleteProduct(@Param('idProduct', ParseIntPipe) idProduct: string): any {
    return this.productosService.deleteProducto(+idProduct);
  }
}
