import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiKeyGuard } from './api-key.guard';
import { Reflector } from '@nestjs/core';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from 'auth/decorators/public-decorator.decorator';

const mockConfigService = {
  apiKey: process.env.API_KEY,
};

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;
  let reflector: Reflector;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeyGuard,
        Reflector,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: 'CONFIGURATION(config)',
          useValue: mockConfigService,
        },
      ],
    }).compile();

    guard = module.get<ApiKeyGuard>(ApiKeyGuard);
    reflector = module.get<Reflector>(Reflector);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true if the API key is valid', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            auth: process.env.API_KEY,
          },
        }),
      }),
      getHandler: jest.fn(() => ({
        [IS_PUBLIC_KEY]: true,
      })),
    } as any;

    const result = await guard.canActivate(context);
    expect(result).toBe(true);
  });

  // it('should throw new UnauthorizedException if the API key is invalid', async () => {
  //   const context = {
  //     switchToHttp: () => ({
  //       getRequest: () => ({
  //         headers: {
  //           auth: '6789',
  //         },
  //       }),
  //     }),
  //     getHandler: jest.fn(() => ({
  //       [IS_PUBLIC_KEY]: false,
  //     })),
  //   } as any;

  //   await expect(guard.canActivate(context)).rejects.toThrow(
  //     new UnauthorizedException('No está autorizado para realizar esta acción'),
  //   );
  // });

  it('should allow public access if IS_PUBLIC_KEY is set', async () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
      getHandler: () => ({
        [IS_PUBLIC_KEY]: true,
      }),
    } as any;

    const result = await guard.canActivate(context);
    expect(result).toBe(true);
  });
});
