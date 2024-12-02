import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'auth/services/auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      userNameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    console.log('Validando usuario:', email);
    const user = await this.authService.validateUser(email, password);
    console.log('-------------------Usuario validado:', user);
    if (!user) {
      console.log('-------------------------Autenticación fallida');
      return new UnauthorizedException('No está autorizado');
    }

    return user;
  }
}
