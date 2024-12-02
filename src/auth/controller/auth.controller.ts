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
      return req.user;
    } catch (err) {
      throw err;
    }
  }
}
