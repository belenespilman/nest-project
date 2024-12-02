import { Injectable } from '@nestjs/common';
import { OperadoresService } from 'operadores/services/operadores.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private operadoresService: OperadoresService) {}

  async validateUser(email: string, password: string) {
    console.log('Entrando a validateUser', { email, password });
    const operador = await this.operadoresService.findByEmail(email);
    console.log('Operador encontrado:', operador);
    if (!operador) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, operador.password);
    console.log('Contraseña verificada:', isMatch);

    if (!!isMatch) {
      console.log('Contraseña correcta, retornando usuario');
      const { password, ...rta } = operador.toObject();
      return operador;
    }
    console.log('Contraseña incorrecta');
    return null;
  }
}
