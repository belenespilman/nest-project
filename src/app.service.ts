import { Injectable, Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('TAREA_ASYNC') private readonly tarea: any,
    @Inject(ConfigService) private configService: ConfigService,
  ) {}

  getHello(): any {
    return {
      message: 'API is live!',
      docs: 'http://localhost:3000/docs',
    };
  }
}
