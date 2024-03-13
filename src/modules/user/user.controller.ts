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

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Roles(ERole.BUYER, ERole.SELLER)
  // @SkipAuth()
  // @ApiOperation({ summary: 'Create new user' })
  // @Post()
  // public async create(
  //   @Body() dto: UserCreateRequestDto,
  // ): Promise<UserResponseDto> {
  //   return await this.userService.create(dto);
  // }
  @SkipAuth()
  @ApiOperation({ summary: 'Find all users' })
  @Get()
  public async findAllUsers(): Promise<UserResponseDto[]> {
    return await this.userService.findAllUsers();
  }

  @ApiBearerAuth()
  @Roles(ERole.BUYER, ERole.SELLER, ERole.DEALER, ERole.ADMIN, ERole.MANAGER)
  // @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'Update user' })
  @Patch(':userId')
  public async updateUser(
    @CurrentUser() userData: IUser,
    @Body() dto: UserUpdateRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateUser(userData, dto);
  }

  @ApiBearerAuth()
  @Roles(ERole.BUYER, ERole.SELLER, ERole.DEALER, ERole.MANAGER, ERole.ADMIN)
  // @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'Get user by Id' })
  @Get(':userId')
  public async getUserById(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserResponseDto> {
    return await this.userService.getUserById(userId);
  }

  @ApiBearerAuth()
  // @UseGuards(RoleGuard)
  @Roles(ERole.BUYER, ERole.SELLER, ERole.DEALER, ERole.MANAGER, ERole.ADMIN)
  @ApiOperation({ summary: 'Delete user by Id' })
  @Delete(':userId')
  public async delete(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<void> {
    return await this.userService.deleteUser(userId);
  }
}
