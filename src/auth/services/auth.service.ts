import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OperadoresService } from 'operadores/services/operadores.service';
import * as bcrypt from 'bcrypt';
import { Operador } from 'operadores/entities/operador.entity';
import { PayloadToken } from 'auth/models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private operadoresService: OperadoresService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const operador = await this.operadoresService.findByEmail(email);
    if (!operador) {
      throw new UnauthorizedException('El operador no existe');
    }
    const isMatch = await bcrypt.compare(password, operador.password);

    if (!!isMatch) {
      const { password, ...rta } = operador.toObject();
      return rta;
    }

    throw new UnauthorizedException('Credenciales incorrectas');
  }

  async generateJWT(operador: Operador) {
    const payload: PayloadToken = {
      role: operador.role,
      sub: operador._id.toString(),
    };

    return {
      access_token: this.jwtService.sign(payload),
      operador,
    };
  }
}
