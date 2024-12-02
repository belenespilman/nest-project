import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { error } from 'console';
import { Request } from 'express-serve-static-core';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request) {
    try {
      console.log('Petición a /auth/login', req.user);
      console.log('reqbody', req.body);
      return req.user;
    } catch (err) {
      console.error('Error en el login:', error);
      throw err;
    }
  }
}
