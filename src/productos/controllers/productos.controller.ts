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
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/productos/dtos/productos.dto';
import { ProductosService } from 'src/productos/services/productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private productosService: ProductosService) {}

  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  getAllProducts(): any {
    return this.productosService.findAll();
  }

  @Get('/:idProduct')
  @HttpCode(HttpStatus.ACCEPTED)
  getProductById(@Param('idProduct', ParseIntPipe) idProduct: number): any {
    return this.productosService.findOne(idProduct);
  }

  @Post()
  createProducto(@Body() payload: CreateProductDto): any {
    return this.productosService.createProduct(payload);
  }

  @Put('/:idProduct')
  updateProduct(
    @Param('idProduct', ParseIntPipe) idProduct: string,
    @Body() body: UpdateProductDto,
  ): any {
    return this.productosService.updateProducto(+idProduct, body);
  }

  @Delete('/:idProduct')
  deleteProduct(@Param('idProduct', ParseIntPipe) idProduct: string): any {
    return this.productosService.deleteProducto(+idProduct);
  }
}
