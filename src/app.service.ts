import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Db } from 'mongodb';
@Injectable()
export class AppService {
  constructor(
    @Inject('TAREA_ASYNC') private readonly tarea: any,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('MONGO') private database: Db,
  ) {}

  getHello(): any {
    return {
      message: 'API is live!',
      docs: 'http://localhost:3000/docs',
    };
  }
}
