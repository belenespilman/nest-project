import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const mockConfigService = {
      apiKey: 'mi-api-key',
      database: {
        name: 'mi-base-de-datos',
        port: 5432,
      },
    };
    const mockMongo = {
      connect: jest.fn(),
      close: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [HttpModule],
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
        {
          provide: 'CONFIGURATION(config)',
          useValue: mockConfigService,
        },
        {
          provide: 'MONGO',
          useValue: mockMongo,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
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
