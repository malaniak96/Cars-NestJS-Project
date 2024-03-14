import {
  Controller,
  Get,
  Param,
  Delete,
  Patch,
  ParseUUIDPipe,
  Put,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';

import { ManagerService } from './services/manager.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles';
import { ERole } from '../../common/enums/role.enum';
import { CarResponseDto } from '../car/dto/response/car.response.dto';
import { UserResponseDto } from '../user/dto/response/user.response.dto';
import { RoleGuard } from '../../common/guards/roles.guard';

@ApiBearerAuth()
@Roles(ERole.MANAGER, ERole.ADMIN)
@UseGuards(RoleGuard)
@ApiTags('Manager')
@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @ApiOperation({
    summary: 'Get all cars with status NOT ACTIVE',
  })
  @Get()
  async getCarsWithStatusNotActive(): Promise<CarResponseDto[]> {
    return await this.managerService.getCarsWithStatusNotActive();
  }

  @ApiOperation({ summary: 'Block user' })
  @Patch(':userId')
  public async blockUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    return await this.managerService.blockUser(userId);
  }

  @ApiOperation({
    summary: 'Get user by id with status blocked',
  })
  @Get(':userId')
  async getUserWithStatusBlocked(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserResponseDto> {
    return await this.managerService.getUserWithStatusBlocked(userId);
  }

  @ApiOperation({ summary: 'Unblock user' })
  @Put(':userId')
  async unblockUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.managerService.unblockUser(userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user by id' })
  @Delete(':userId')
  async deleteUserById(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.managerService.deleteUser(userId);
  }

  // @ApiOperation({
  //   summary: 'Approve PREMIUM account for the user',
  // })
  // @HttpCode(HttpStatus.NO_CONTENT)
  // @Post(':userId')
  // async approvePremiumForUser(@Param('userId', ParseUUIDPipe) userId: string): Promise<void> {
  //   await this.managerService.approvePremiumForUser(userId);
  // }
}
