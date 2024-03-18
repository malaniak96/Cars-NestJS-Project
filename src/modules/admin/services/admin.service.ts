import { Body, Injectable, UnprocessableEntityException } from '@nestjs/common';

import { CreateManagerRequestDto } from '../../manager/dto/request/create-manager.request.dto';
import { CreateAdminRequestDto } from '../dto/request/create-admin.request.dto';
import { AuthService } from '../../auth/services/auth.service';
import { AuthUserResponseDto } from '../../auth/dto/response/auth-user.response.dto';
import { UserRepository } from '../../repositories/services/user.repository';
import { UserEntity } from '../../../database/entities/user.entity';

@Injectable()
export class AdminService {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  public async createAdmin(
    admin: CreateAdminRequestDto,
  ): Promise<AuthUserResponseDto> {
    return await this.authService.signUp(admin);
  }
  public async getAdmin(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ email });
  }

  public async createManager(
    @Body() dto: CreateManagerRequestDto,
  ): Promise<AuthUserResponseDto> {
    return await this.authService.signUp(dto);
  }

  // public async createManager(
  //   @Body() dto: UserCreateRequestDto,
  // ): Promise<UserResponseDto> {
  //   const findUser = await this.userRepository.findOneBy({ email: dto.email });
  //   if (findUser) {
  //     throw new BadRequestException('User already exists');
  //   }
  //   const newUser = this.userRepository.create(dto);
  //
  //   return this.userRepository.save(newUser);
  // }
  // public deleteManager(id: number) {
  //   return `This action removes a #${id} admin`;
  // }
  public async deleteManager(userId: string): Promise<void> {
    const userEntity = await this.findByIdOrThrowException(userId);
    await this.userRepository.remove(userEntity);
  }
  public async findByIdOrThrowException(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UnprocessableEntityException();
    }
    return user;
  }
}
