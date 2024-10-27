import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TAREA_ASYNC') private readonly tarea: any,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    const dbPort = this.configService.database.port;
    return `La llave de la aplicación es ${apiKey}. La base de datos "${dbName}" corre en el puerto ${dbPort}`;
  }

  getUseFactory(): string {
    return 'Realizando una tarea asincrona de ejemplo';
  }
}
