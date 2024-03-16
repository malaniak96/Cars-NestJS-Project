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
import { CarAdsResponseDto } from '../car/dto/response/car-ads.response.dto';
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
    summary: 'Get cars with status NOT ACTIVE',
  })
  @Get()
  public async getCarAdsWithStatusNotActive(): Promise<CarAdsResponseDto[]> {
    return await this.managerService.getCarAdsWithStatusNotActive();
  }
  @ApiOperation({ summary: 'Delete INACTIVE car by id' })
  @Delete(':carId')
  public async deleteInactiveCarById(
    @Param('carId') carId: string,
  ): Promise<void> {
    await this.managerService.deleteInactiveCarById(carId);
  }
  @ApiOperation({
    summary: 'Get user by id with status BLOCKED',
  })
  @Get(':userId')
  public async getUserWithStatusBlocked(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserResponseDto> {
    return await this.managerService.getUserWithStatusBlocked(userId);
  }

  @ApiOperation({ summary: 'BLOCK user' })
  @Patch(':userId')
  public async blockUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    return await this.managerService.blockUser(userId);
  }

  @ApiOperation({ summary: 'UNBLOCK user' })
  @Put(':userId')
  async unblockUser(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.managerService.unblockUser(userId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'DELETE user by id' })
  @Delete(':userId')
  async deleteUserById(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    await this.managerService.deleteUser(userId);
  }
}
