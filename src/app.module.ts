import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import {
  lastValueFrom,
  LastValueFromConfig,
} from 'rxjs/internal/lastValueFrom';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { OperadoresModule } from './operadores/operadores.module';
import { ProductosModule } from './productos/productos.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [HttpModule, OperadoresModule, ProductosModule, DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TAREA_ASYNC',
      useFactory: async (http: HttpService) => {
        const req = http.get('https://jsonplaceholder.typicode.com/posts');
        const tarea = await lastValueFrom(req);
        return tarea.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
