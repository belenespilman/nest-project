import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { OperadoresService } from 'operadores/services/operadores.service';
import { Operador } from 'operadores/entities/operador.entity';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let operadoresService: OperadoresService;

  const mockOperadoresService = {
    findByEmail: jest.fn().mockResolvedValue({
      email: 'test@operador.com',
      password: 'hashedpassword',
      role: 'admin',
      _id: { toString: jest.fn().mockReturnValue('mocked-id') },
    }),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: OperadoresService, useValue: mockOperadoresService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    operadoresService = module.get<OperadoresService>(OperadoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw UnauthorizedException for incorrect credentials', async () => {
    const email = 'test@operador.com';
    const password = 'wrongpassword';
    await expect(service.validateUser(email, password)).rejects.toThrow(
      'Credenciales incorrectas',
    );
  });

  it('should generate JWT token', async () => {
    const operador = {
      role: 'admin',
      _id: { toString: () => 'mocked-id' },
    } as Operador;
    const result = await service.generateJWT(operador);
    expect(result).toHaveProperty('access_token');
    expect(result.access_token).toBe('mocked-jwt-token');
  });
});
