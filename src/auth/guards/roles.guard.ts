import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'auth/decorators/roles.decorator';
import { Role } from 'auth/models/roles.model';
import { PayloadToken } from 'auth/models/token.model';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const operador = request.user as PayloadToken;

    const isAuth = roles.some((role) => role === operador.role);
    if (!isAuth) {
      throw new UnauthorizedException('Tu rol no permite realizar esta acción');
    }
    return isAuth;
  }
}
