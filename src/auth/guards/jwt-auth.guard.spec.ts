import { JwtAuthGuard } from './jwt-auth.guard';
import { Reflector } from '@nestjs/core';

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = { get: jest.fn() } as any;
    jwtAuthGuard = new JwtAuthGuard(reflector);
  });

  it('should be defined', () => {
    expect(jwtAuthGuard).toBeDefined();
  });
});
