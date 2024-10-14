import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApiKey(): string {
    return this.appService.getApiKey();
  }

  @Get('usefactory')
  getUseFactory(): string {
    return this.appService.getUseFactory();
  }
}
