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
} from '@nestjs/common';

import { ManagerService } from './services/manager.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles';
import { ERole } from '../../common/enums/role.enum';
import { CarResponseDto } from '../car/dto/response/car.response.dto';

@ApiBearerAuth()
@ApiTags('Manager')
@Roles(ERole.MANAGER, ERole.ADMIN)
// @UseGuards(RoleGuard)
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
  async blockUser(
    @Param('userId', ParseUUIDPipe)
    userId: string,
  ): Promise<void> {
    await this.managerService.blockUser(userId);
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
