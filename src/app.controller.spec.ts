import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('should return hello message with API key and database info', () => {
      const result = appController.getApiKey();
      expect(result).toBe(
        'La llave de la aplicación es mi-api-key. La base de datos "mi-base-de-datos" corre en el puerto 5432',
      );
    });
  });
});
