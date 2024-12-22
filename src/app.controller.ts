import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Public } from 'auth/decorators/public-decorator.decorator';

@Public()
@ApiTags('App')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Acceder a ruta base',
    description:
      'Esta ruta permite verificar que la API está funcionando correctamente',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve un mensaje de bienvenida',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
