import { Request } from '@nestjs/common';
import { LoginDto } from 'auth/dtos/login.dto';
import { Operador } from 'operadores/entities/operador.entity';

declare global {
  namespace Express {
    interface Request {
      user?: LoginDto;
    }
  }
}
