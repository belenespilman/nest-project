import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express-serve-static-core';
import { Operador } from 'operadores/entities/operador.entity';
import { AuthService } from 'auth/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request) {
    try {
      const operador = req.user as Operador;
      return this.authService.generateJWT(operador);
    } catch (err) {
      throw err;
    }
  }
}
