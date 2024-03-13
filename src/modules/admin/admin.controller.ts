import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Delete,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { AdminService } from './services/admin.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles';
import { ERole } from '../../common/enums/role.enum';
import { CreateManagerRequestDto } from '../manager/dto/request/create-manager.request.dto';
import { AuthUserResponseDto } from '../auth/dto/response/auth-user.response.dto';
import { RoleGuard } from '../../common/guards/roles.guard';
import { UserService } from '../user/services/user.service';

@Roles(ERole.ADMIN)
@ApiBearerAuth()
// @UseGuards(RoleGuard)
@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Create Manager for the Car Market',
  })
  @Post('manager')
  public async createManager(
    @Body() body: CreateManagerRequestDto,
  ): Promise<AuthUserResponseDto> {
    return await this.adminService.createManager(body);
  }

  // @HttpCode(HttpStatus.NO_CONTENT)
  // @ApiOperation({
  //   summary: 'Delete manager of Car Market',
  // })
  // @Delete(':managerId')
  // public async deleteManager(
  //   @Param('managerId') managerId: string,
  // ): Promise<void> {
  //   return await this.adminService.deleteManager(managerId);
  // }

  @ApiBearerAuth()
  // @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'Delete manager of the Car Market' })
  @Delete(':userId')
  public async deleteManager(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    return await this.adminService.deleteManager(userId);
  }
}
