import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './services/user.service';
import { UserUpdateRequestDto } from './dto/request/update-user.request.dto';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IUser } from '../../interfaces/user.interface';
import { UserResponseDto } from './dto/response/user.response.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserCreateRequestDto } from './dto/request/create-user.request.dto';
import { ERole } from '../../common/enums/role.enum';
import { RoleGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles';

@ApiBearerAuth()
@ApiTags('Users')
@Roles(ERole.ADMIN)
@UseGuards(RoleGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(ERole.BUYER, ERole.SELLER)
  @ApiOperation({ summary: 'Create new user' })
  @ApiBearerAuth()
  @Post()
  async createUser(
    @Body() dto: UserCreateRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.createUser(dto);
  }

  @Roles(ERole.BUYER, ERole.SELLER)
  @ApiOperation({ summary: 'Find all users' })
  @Get()
  public async findAllUsers(): Promise<UserResponseDto[]> {
    return await this.userService.findAllUsers();
  }

  @Roles(ERole.BUYER, ERole.SELLER)
  @ApiOperation({ summary: 'Update user' })
  @ApiBearerAuth()
  @Patch(':userId')
  public async updateUser(
    @CurrentUser() userData: IUser,
    @Body() dto: UserUpdateRequestDto,
  ): Promise<UserResponseDto> {
    return await this.userService.updateUser(userData, dto);
  }

  @Roles(ERole.BUYER, ERole.SELLER)
  @ApiOperation({ summary: 'Get user by Id' })
  @Get(':userId')
  public async getUserById(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserResponseDto> {
    return await this.userService.getUserById(userId);
  }

  @Roles(ERole.BUYER, ERole.SELLER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user by Id' })
  @Delete(':userId')
  async delete(@Param('userId') userId: string): Promise<void> {
    await this.userService.deleteUser(userId);
  }
}
