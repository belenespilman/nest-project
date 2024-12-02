import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { ApiKeyGuard } from 'auth/guards/api-key.guard';
import { Public } from 'auth/decorators/public-decorator.decorator';

@Public()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  @Get()
  getApiKey(): string {
    return this.appService.getHello();
  }

  @Get('usefactory')
  getUseFactory(): string {
    return this.appService.getUseFactory();
  }

  @Get('tasks')
  getTasks(): string {
    return this.appService.getTasks();
  }

  @UseGuards(ApiKeyGuard)
  @Get('protected')
  getProtected() {
    return {
      message: 'Acceso autorizado',
    };
  }
}
