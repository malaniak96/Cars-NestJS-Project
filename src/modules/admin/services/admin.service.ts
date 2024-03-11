import {
  BadRequestException,
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { AdminRepository } from '../../repositories/services/admin.repository';
import { ManagerRepository } from '../../repositories/services/manager.repository';
import { CreateManagerRequestDto } from '../../manager/dto/request/create-manager.request.dto';
import { ManagerResponseDto } from '../../manager/dto/response/manager.response.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly managerRepository: ManagerRepository,
  ) {}

  // public async createAdmin(dto: CreateAdminRequestDto) {
  //   return await this.adminRepository.register(admin);
  // }

  // public async createManager(dto: CreateManagerDto): Promise<any> {
  //   return this.adminRepository.create(dto);
  // }

  public async createManager(
    @Body() dto: CreateManagerRequestDto,
  ): Promise<ManagerResponseDto> {
    const findManager = await this.managerRepository.findOneBy({
      email: dto.email,
    });
    if (findManager) {
      throw new BadRequestException('Manager already exists');
    }
    const newManager = this.managerRepository.create(dto);

    return await this.managerRepository.save(newManager);
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

  public async deleteManager(managerId: string): Promise<void> {
    const managerEntity = await this.findByIdManagerOrThrowException(managerId);
    await this.managerRepository.remove(managerEntity);
    throw new HttpException('Manager is deleted', HttpStatus.OK);
  }

  public async findByIdManagerOrThrowException(
    managerId: string,
  ): Promise<any> {
    const manager = await this.managerRepository.findOneBy({ id: managerId });
    if (!manager) {
      throw new UnprocessableEntityException();
    }
    return manager;
  }
}
