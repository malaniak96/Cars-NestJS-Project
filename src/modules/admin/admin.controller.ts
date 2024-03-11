import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  Delete,
} from '@nestjs/common';

import { AdminService } from './services/admin.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles';
import { ERole } from '../../common/enums/role.enum';
import { CreateManagerRequestDto } from '../manager/dto/request/create-manager.request.dto';
import { ManagerResponseDto } from '../manager/dto/response/manager.response.dto';

@Roles(ERole.ADMIN)
@ApiBearerAuth()
// @UseGuards(AuthGuard(), RoleGuard)
@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Create Manager for Car Market',
  })
  @Post('manager')
  public async createManager(
    @Body() body: CreateManagerRequestDto,
  ): Promise<ManagerResponseDto> {
    return await this.adminService.createManager(body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete manager of Car Market',
  })
  @Delete(':managerId')
  public async deleteManager(
    @Param('managerId') managerId: string,
  ): Promise<void> {
    return await this.adminService.deleteManager(managerId);
  }
}
