import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('APIKEY') private apiKey: string,
    @Inject('TAREA_ASYNC') private readonly tarea: any,
  ) {}

  getApiKey(): string {
    return `La llave de la aplicación es ${this.apiKey}`;
  }

  getUseFactory(): string {
    console.log(this.tarea);
    return 'Realizando una tarea asincrona de ejemplo';
  }
}
