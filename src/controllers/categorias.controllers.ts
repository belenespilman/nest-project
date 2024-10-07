import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class CategoriasController {
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return 'User with ID ${id}';
  }
}
