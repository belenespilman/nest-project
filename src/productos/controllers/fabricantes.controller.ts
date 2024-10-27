import { Controller } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Fabricantes')
@Controller('fabricantes')
export class FabricantesController {}
