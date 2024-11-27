import {
  Get,
  Put,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MongoldPipe } from 'common/mongold.pipe';
import { ParseIntPipe } from 'common/parse-int.pipe';
import {
  CreateCompradorDTO,
  UpdateCompradorDTO,
} from 'operadores/dtos/compradores.dto';
import { CompradoresService } from 'operadores/services/compradores.service';

@ApiTags('Compradores')
@Controller('compradores')
export class CompradoresController {
  constructor(private compradoresService: CompradoresService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener lista de todos los compradores' })
  @HttpCode(HttpStatus.ACCEPTED)
  getAllCompradores(): any {
    return this.compradoresService.findAll();
  }

  @Get('/:idComprador')
  @ApiOperation({ summary: 'Obtener comprador por ID' })
  @HttpCode(HttpStatus.ACCEPTED)
  getCompradorbyId(
    @Param('idComprador', MongoldPipe) idComprador: string,
  ): any {
    {
      return this.compradoresService.findOne(idComprador);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Crear Comprador' })
  createComprador(@Body() payload: CreateCompradorDTO): any {
    return this.compradoresService.createComprador(payload);
  }

  @Put('/:idComprador')
  @ApiOperation({ summary: 'Actualizar Comprador' })
  updateComprador(
    @Param('IdComprador', MongoldPipe) idComprador: string,
    @Body() body: UpdateCompradorDTO,
  ): any {
    return this.compradoresService.updateComprador(idComprador, body);
  }

  @Delete('/:idComprador')
  @ApiOperation({ summary: 'Eliminar un comprador' })
  deleteComprador(@Param('idComprador', MongoldPipe) idComprador: string): any {
    return this.compradoresService.removeComprador(idComprador);
  }
}
