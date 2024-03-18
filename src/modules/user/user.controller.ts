import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './services/user.service';
import { UserUpdateRequestDto } from './dto/request/update-user.request.dto';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IUser } from '../../interfaces/user.interface';
import { UserResponseDto } from './dto/response/user.response.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ERole } from '../../common/enums/role.enum';
import { Roles } from '../../common/decorators/roles';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { RoleGuard } from '../../common/guards/roles.guard';
import { DeleteUserDto } from './dto/request/delete-user.request.dto';
import { AccountTypeChangeRequestDto } from './dto/request/account-type-change.request.dto';

@Roles(ERole.ADMIN)
@UseGuards(RoleGuard)
@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @SkipAuth()
  @ApiOperation({ summary: 'Find all users' })
  @Get()
  public async findAllUsers(): Promise<UserResponseDto[]> {
    return await this.userService.findAllUsers();
  }

  @ApiBearerAuth()
  @Roles(ERole.BUYER, ERole.SELLER, ERole.DEALER, ERole.ADMIN, ERole.MANAGER)
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'Update user information' })
  @Patch(':userId')
  public async updateUser(
    @CurrentUser() userData: IUser,
    @Body() dto: UserUpdateRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateUser(userData, dto);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Get User by id with Cars' })
  @Get(':userId')
  public async getUserByIdWithCars(
    @Param('userId') userId: string,
  ): Promise<UserResponseDto> {
    return this.userService.getUserByIdWithCars(userId);
  }

  @ApiBearerAuth()
  @Roles(ERole.BUYER, ERole.SELLER, ERole.DEALER, ERole.MANAGER, ERole.ADMIN)
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'Delete user by Id' })
  @Delete(':userId')
  public async delete(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() deleteDto: DeleteUserDto,
  ): Promise<void> {
    return await this.userService.delete(userId, deleteDto);
  }

  @ApiBearerAuth()
  @Roles(ERole.BUYER, ERole.SELLER, ERole.DEALER, ERole.ADMIN, ERole.MANAGER)
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'Update Account Type Basic or Premium' })
  @Patch(':userId/change-account-type')
  public async changeAccountType(
    @CurrentUser() userData: IUser,
    @Body() dto: AccountTypeChangeRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateUser(userData, dto);
  }
}
