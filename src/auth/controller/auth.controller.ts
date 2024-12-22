import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express-serve-static-core';
import { Operador } from 'operadores/entities/operador.entity';
import { AuthService } from 'auth/services/auth.service';
import { ApiKeyGuard } from 'auth/guards/api-key.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: 'Login' })
  @Post('login')
  async login(@Req() req: Request) {
    try {
      const operador = req.user as Operador;
      return this.authService.generateJWT(operador);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(ApiKeyGuard)
  @Get('protected')
  @ApiOperation({ summary: 'Acceder a ruta protegida' })
  getProtected() {
    return {
      message: 'Acceso autorizado',
    };
  }
}
