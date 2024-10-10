import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { OperadoresModule } from './operadores/operadores.module';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [OperadoresModule, ProductosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
