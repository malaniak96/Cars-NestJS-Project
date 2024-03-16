import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CarAdsResponseDto } from '../../car/dto/response/car-ads.response.dto';
import { UserRepository } from '../../repositories/services/user.repository';
import { CarRepository } from '../../repositories/services/car.repository';
import { ECarStatus } from '../../car/enums/car-ads-status.enum';
import { UserService } from '../../user/services/user.service';
import { UserResponseDto } from '../../user/dto/response/user.response.dto';
import { UserMapper } from '../../user/services/user.mapper';
import { UserEntity } from '../../../database/entities/user.entity';

@Injectable()
export class ManagerService {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
  ) {}

  public async getCarAdsWithStatusNotActive(): Promise<CarAdsResponseDto[]> {
    return await this.carRepository.findBy({ status: ECarStatus.NOT_ACTIVE });
  }

  public async deleteInactiveCarById(carId: string): Promise<void> {
    const car = await this.carRepository.findOneBy({
      id: carId,
      status: ECarStatus.NOT_ACTIVE,
    });
    if (!car) {
      throw new NotFoundException(`Inactive car with ID ${carId} not found`);
    }
    await this.carRepository.remove(car);
  }
  public async blockUser(userId: string): Promise<void> {
    const userToBlock = await this.userService.getUserByIdWithCars(userId);

    if (userToBlock.role === 'admin' || userToBlock.role === 'manager') {
      throw new ConflictException('Managers and admins cannot be blocked');
    }

    if (userToBlock.blocked) {
      throw new ConflictException('User has been already blocked');
    }
    userToBlock.blocked = true;
    await this.userRepository.save(userToBlock);

    new Logger().log(`User with id: ${userId} has been successfully blocked`);
  }

  async unblockUser(userId: string): Promise<void> {
    const userToBeUnblocked =
      await this.userService.getUserByIdWithCars(userId);

    if (!userToBeUnblocked.blocked) {
      throw new ConflictException('User has been already unblocked');
    }

    userToBeUnblocked.blocked = false;
    await this.userRepository.save(userToBeUnblocked);

    new Logger().log(`User with id: ${userId} has been successfully unblocked`);
  }

  async getUserWithStatusBlocked(userId: string): Promise<UserResponseDto> {
    const user = await this.userService.findByIdOrThrowException(userId);

    if (user.blocked === true) {
      return UserMapper.toResponseDto(user);
    }
  }
  public async deleteUser(userId: string): Promise<void> {
    const userEntity = await this.findByIdOrThrowException(userId);
    await this.userRepository.remove(userEntity);
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
}
