import {
  BadRequestException,
  Body,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserUpdateRequestDto } from '../dto/request/update-user.request.dto';
import { UserEntity } from '../../../database/entities/user.entity';
import { UserRepository } from '../../repositories/services/user.repository';
import { IUser } from '../../../interfaces/user.interface';
import { UserResponseDto } from '../dto/response/user.response.dto';
import { UserMapper } from './user.mapper';
import { UserCreateRequestDto } from '../dto/request/create-user.request.dto';
import { EAccountTypes } from '../enums/account-types.enum';
import { CreditCardRequestDto } from '../dto/request/credit-card.request.dto';
import * as bcrypt from 'bcrypt';
import { DeleteUserDto } from '../dto/request/delete-user.request.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findAllUsers(): Promise<UserResponseDto[]> {
    return await this.userRepository.find();
  }
  public async create(
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
  public async delete(userId: string, deleteDto: DeleteUserDto): Promise<void> {
    const user = await this.findByIdOrThrowException(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const passwordMatches = await bcrypt.compare(
      deleteDto.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid password');
    }

    await this.userRepository.remove(user);

    new Logger().log(`User with id: ${userId} has been successfully deleted`);
  }

  public async findByIdOrThrowException(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UnprocessableEntityException(
        `User with ID: ${userId} was not found`,
      );
    }
    return user;
  }

  public async upgradeToPremium(
    user: IUser,
    creditCardInfo: CreditCardRequestDto,
  ): Promise<void> {
    if (!creditCardInfo) {
      throw new UnprocessableEntityException(
        'Please enter your credit card information to upgrade to premium account',
      );
    }
    user.creditCardInfo = creditCardInfo;
    user.typeAccount = EAccountTypes.PREMIUM;
    await this.userRepository.save(user);
  }
}
