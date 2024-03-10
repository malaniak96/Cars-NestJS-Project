import {
  BadRequestException,
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserUpdateRequestDto } from '../dto/request/update-user.request.dto';
import { UserCreateRequestDto } from '../dto/request/create-user.request.dto';
import { UserEntity } from '../../../database/entities/user.entity';
import { UserRepository } from '../../repositories/services/user.repository';
import { IUser } from '../../../interfaces/user.interface';
import { UserResponseDto } from '../dto/response/user.response.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findAllUsers(): Promise<UserResponseDto[]> {
    return await this.userRepository.find();
  }
  public async createUser(
    @Body() dto: UserCreateRequestDto,
  ): Promise<UserResponseDto> {
    const findUser = await this.userRepository.findOneBy({ email: dto.email });
    if (findUser) {
      throw new BadRequestException('User already exists');
    }
    const newUser = this.userRepository.create(dto);

    return this.userRepository.save(newUser);
  }

  public async updateUser(
    userData: IUser,
    dto: UserUpdateRequestDto,
  ): Promise<UserResponseDto> {
    const entity = await this.userRepository.findOneBy({ id: userData.userId });

    const updatedUser = await this.userRepository.save({ ...entity, ...dto });

    return UserMapper.toResponseDto(updatedUser);
  }

  public async getUserById(userId: string): Promise<UserResponseDto> {
    const entity = await this.findByIdOrThrowException(userId);
    return UserMapper.toResponseDto(entity);
  }

  public async deleteUser(userId: string): Promise<void> {
    const userEntity = await this.findByIdOrThrowException(userId);
    await this.userRepository.remove(userEntity);
    throw new HttpException('User is deleted!', HttpStatus.OK);
  }

  public async findByIdOrThrowException(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UnprocessableEntityException();
    }
    return user;
  }
}
