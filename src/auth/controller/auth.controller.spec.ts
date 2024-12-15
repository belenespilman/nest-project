import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from 'auth/services/auth.service';
import { mock } from 'jest-mock-extended';
import { Operador } from 'operadores/entities/operador.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const mockAuthService = {
      generateJWT: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call authService.generateJWT when login is invoked', async () => {
    const operador = mock<Operador>();
    operador.id = 1;
    operador.email = 'test@example.com';
    operador.password = 'hashedPassword';
    operador.role = 'admin';

    const req = { user: operador } as any;

    const mockResponse = {
      access_token: 'mockToken',
      operador,
    };

    jest.spyOn(authService, 'generateJWT').mockResolvedValueOnce(mockResponse);

    const result = await controller.login(req);

    expect(authService.generateJWT).toHaveBeenCalledWith(operador);

    expect(result).toEqual(mockResponse);
  });
});
