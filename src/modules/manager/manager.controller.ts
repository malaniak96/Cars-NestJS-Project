import { Controller, Get, Param, Delete } from '@nestjs/common';

import { ManagerService } from './services/manager.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Manager')
@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  // @Post()
  // create(@Body() createManagerDto: ManagerResponseDto) {
  //   return this.managerService.create(CreateManagerRequestDto);
  // }

  @Get()
  findAll() {
    return this.managerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
  //   return this.managerService.update(+id, updateManagerDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerService.remove(+id);
  }
}
