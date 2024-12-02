import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { error } from 'console';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request) {
    try {
      console.log('Petición a /auth/login', req['user']);
      return req['user'];
    } catch (err) {
      console.error('Error en el login:', error);
      throw err;
    }
  }
}
