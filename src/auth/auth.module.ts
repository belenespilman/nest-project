import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { OperadoresModule } from 'operadores/operadores.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controller/auth.controller';

@Module({
  providers: [AuthService, LocalStrategy],
  imports: [OperadoresModule, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
