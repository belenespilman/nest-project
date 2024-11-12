import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ParseIntPipe } from 'common/parse-int.pipe';
import {
  CreateFabricanteDTO,
  UpdateFabricanteDTO,
} from 'productos/dtos/fabricantes.dto';
import { Fabricante } from 'productos/entities/fabricante.entity';
import { FabricantesService } from 'productos/services/fabricantes.service';

@ApiTags('Fabricantes')
@Controller('fabricantes')
export class FabricantesController {
  constructor(private fabricantesService: FabricantesService) {}
  @ApiOperation({ summary: 'Catálogo con todos los fabricantes' })
  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  getAllFabricantes() {
    return this.fabricantesService.findAll();
  }

  @ApiOperation({ summary: 'Obtener fabricante por ID' })
  @Get('/:idFabricante')
  @HttpCode(HttpStatus.ACCEPTED)
  getFabricantebyId(
    @Param('idFabricante', ParseIntPipe) idFabricante: number,
  ): any {
    return this.fabricantesService.findOne(idFabricante);
  }

  @ApiOperation({ summary: 'Crear un fabricante' })
  @Post()
  createFabricante(@Body() payload: CreateFabricanteDTO): any {
    return this.fabricantesService.createFabricante(payload);
  }

  @ApiOperation({ summary: 'Modoficar/Actualizar un fabricante por ID' })
  @Put('/:idFabricante')
  updateFabricante(
    @Param('idFabricante', ParseIntPipe) idFabricante: number,
    @Body() payload: UpdateFabricanteDTO,
  ): any {
    return this.fabricantesService.updateFabricante(+idFabricante, payload);
  }

  @ApiOperation({ summary: 'Eliminar un fabricante por ID' })
  @Delete('/:idFabricante')
  deleteFabricante(
    @Param('idFabricante', ParseIntPipe) idFabricante: number,
  ): any {
    return this.fabricantesService.deleteFabricante(+idFabricante);
  }
}
