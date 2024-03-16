import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import axios from 'axios';

import { CreateCarAdsRequestDto } from '../dto/request/create-car-ads.request.dto';
import { CarAdsResponseDto } from '../dto/response/car-ads.response.dto';
import { CarRepository } from '../../repositories/services/car.repository';
import { IUser } from '../../../interfaces/user.interface';
import { UserService } from '../../user/services/user.service';
import { UserRepository } from '../../repositories/services/user.repository';

import { CarAdsMapper } from './car-ads.mapper';
import { CarEntity } from '../../../database/entities/car.entity';
import {
  CarStatusChangeRequestDto,
  EditCarAdsRequestDto,
} from '../dto/request/edit-car-ads.request.dto';
import { ECarStatus } from '../enums/car-ads-status.enum';
import { CarsAdsListRequestDto } from '../dto/request/car-ads-list.request.dto';
import { CarsAdsListResponseDto } from '../dto/response/car-ads-list.response.dto';
import { ERegion } from '../enums/region.enum';

@Injectable()
export class CarAdsService {
  constructor(private readonly carRepository: CarRepository) {}
  public async createCarAdvertisement(
    createCar: CreateCarAdsRequestDto,
    user: IUser,
  ): Promise<CarAdsResponseDto> {
    createCar.status = ECarStatus.ACTIVE;
    const carAdvertisement = await this.carRepository.save(
      this.carRepository.create({
        ...createCar,
        user_id: user.userId,
      }),
    );
    return CarAdsMapper.toResponseDto(carAdvertisement);
  }

  public async getCarAdvertisementById(
    carId: string,
  ): Promise<CarAdsResponseDto> {
    const car = await this.carRepository.getCarById(carId);
    if (!car) {
      throw new UnprocessableEntityException('Car was not found');
    }
    return CarAdsMapper.toResponseDto(car);
  }

  public async findAllCarAdvertisements(
    query: CarsAdsListRequestDto,
  ): Promise<CarsAdsListResponseDto> {
    const [entities, total] =
      await this.carRepository.findAllCarAdvertisements(query);

    return CarAdsMapper.toListResponseDto(entities, total, query);
  }

  public async findMyCarAdvertisements(
    query: CarsAdsListRequestDto,
    user: IUser,
    // userId: string,
  ): Promise<CarsAdsListResponseDto> {
    // const userEntity = await this.userService.findByIdOrThrowException(userId);
    const [entities, total] =
      await this.carRepository.findAllMyCarAdvertisements(query, user);
    return CarAdsMapper.toListResponseDto(entities, total, query);
  }

  public async editMyCarAdvertisementById(
    carId: string,
    user: IUser,
    dto: EditCarAdsRequestDto,
  ): Promise<CarAdsResponseDto> {
    console.log(carId, 'carId');
    const car = await this.findMyOneByIdOrThrow(carId, user.userId);
    const editedCar = await this.carRepository.save({
      ...car,
      ...dto,
    });
    return CarAdsMapper.toResponseDto(editedCar);
  }

  public async changeCarStatus(
    carId: string,
    user: IUser,
    dto: CarStatusChangeRequestDto,
  ): Promise<CarAdsResponseDto> {
    console.log(carId, 'carID');
    console.log(user, 'user');
    const car = await this.findMyOneByIdOrThrow(carId, user.userId);
    car.status = dto.status;

    const editedCar = await this.carRepository.save({
      ...car,
      ...dto,
    });
    return CarAdsMapper.toResponseDto(editedCar);
  }

  public async deleteMyCarAdvertisementById(
    carId: string,
    user: IUser,
  ): Promise<void> {
    const article = await this.findMyOneByIdOrThrow(carId, user.userId);
    await this.carRepository.remove(article);
  }

  private async findMyOneByIdOrThrow(
    carId: string,
    userId: string,
  ): Promise<CarEntity> {
    const car = await this.carRepository.findOneBy({
      id: carId,
    });

    if (!car) {
      throw new UnprocessableEntityException(
        `Car with id: ${carId} is not found`,
      );
    }

    if (car.user_id !== userId) {
      throw new ForbiddenException();
    }
    return car;
  }
}
