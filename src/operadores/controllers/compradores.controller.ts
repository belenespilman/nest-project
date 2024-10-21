import { Controller } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Compradores')
@Controller('compradores')
export class CompradoresController {}
