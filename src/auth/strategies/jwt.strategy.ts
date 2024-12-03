import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import config from 'config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadToken } from 'auth/models/token.model';
import { OperadoresService } from 'operadores/services/operadores.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private operadoresService: OperadoresService,
    @Inject(config.KEY) ConfigService: ConfigType<typeof config>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ConfigService.jwtSecret,
    });
  }

  async validate(payload: PayloadToken) {
    const operador = await this.operadoresService.findOne(payload.sub);

    if (!operador) {
      throw new UnauthorizedException('Operador no encontrado');
    }

    return operador;
  }
}
