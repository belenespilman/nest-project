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
  getAllProducts(): any {
    return this.productosService.findAll();
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

  @Delete('/:idProduct')
  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  deleteProduct(@Param('idProduct', ParseIntPipe) idProduct: string): any {
    return this.productosService.deleteProducto(+idProduct);
  }
}
