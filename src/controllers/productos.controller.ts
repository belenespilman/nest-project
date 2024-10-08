import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

@Controller('productos')
export class ProductosController {
  @Get()
  getAllProducts(): any {
    return {
      message: 'All products obtained',
      products: [
        { id: 1, nombre: 'Producto 1', precio: 100 },
        { id: 2, nombre: 'Producto 2', precio: 200 },
      ],
    };
  }

  @Get('/:idProduct')
  getProductById(@Param('idProduct') idProduct: string): any {
    return {
      message: 'Product obtained by ID',
      product: { id: idProduct, nombre: 'Producto ' + idProduct, precio: 150 },
    };
  }

  @Post()
  createProducto(@Body() payload: any): any {
    return {
      message: 'Product created succesfully',
      producto: payload,
    };
  }

  @Put('/:idProduct')
  updateProduct(@Param('idProduct') idProduct: string, @Body() body: any): any {
    return {
      idProduct: idProduct,
      nombre: body.nombre,
      precio: body.precio,
    };
  }

  @Delete('/:idProduct')
  deleteProduct(@Param('idProduct') idProduct: string): any {
    return {
      idProduct: idProduct,
      delete: true,
      count: 1,
    };
  }
}
