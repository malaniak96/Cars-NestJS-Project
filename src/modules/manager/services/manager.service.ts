import { Injectable } from '@nestjs/common';
import { CarResponseDto } from '../../car/dto/response/car.response.dto';
import { UserRepository } from '../../repositories/services/user.repository';
import { CarRepository } from '../../repositories/services/car.repository';
import { ECarStatus } from '../../car/enums/car-status.enum';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class ManagerService {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
  ) {}
  async getCarsWithStatusNotActive(): Promise<CarResponseDto[]> {
    return await this.carRepository.findBy({ status: ECarStatus.NOT_ACTIVE });
  }

  // async getUsersWithStatusNotActive(): Promise<UserResponseDto[]> {
  //   return await this.userRepository.findBy({ id: status });
  // }

  async blockUser(userId: string): Promise<void> {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    if (!user.blocked) {
      user.blocked = true;
      await this.userRepository.save(user);
    }
  }

  async unblockUser(userId: string): Promise<void> {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    if (!user.blocked) {
      user.blocked = false;
      await this.userRepository.save(user);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userService.deleteUser(userId);
  }

  // async approvePremiumForUser(userId: string): Promise<void> {}
}
