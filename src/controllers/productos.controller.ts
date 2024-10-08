import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProductosService } from 'src/services/productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private productosService: ProductosService) {}

  @Get()
  getAllProducts(): any {
    return this.productosService.findAll();
  }

  @Get('/:idProduct')
  getProductById(@Param('idProduct') idProduct: string): any {
    return this.productosService.findOne(+idProduct);
  }

  @Post()
  createProducto(@Body() payload: any): any {
    return this.productosService.createProduct(payload);
  }

  @Put('/:idProduct')
  updateProduct(@Param('idProduct') idProduct: string, @Body() body: any): any {
    return this.productosService.updateProducto(+idProduct, body);
  }

  @Delete('/:idProduct')
  deleteProduct(@Param('idProduct') idProduct: string): any {
    return this.productosService.deleteProducto(+idProduct);
  }
}
