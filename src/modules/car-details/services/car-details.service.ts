import { BaseCarAdsRequestDto } from '../../car/dto/request/base-car-ads.request.dto';
import { AxiosService } from './axios.service';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { CarRepository } from '../../repositories/services/car.repository';
import { ERegion } from '../../car/enums/region.enum';
import { CarEntity } from '../../../database/entities/car.entity';
import { RegionAveragePriceResponseDto } from '../dto/region-average-price.response.dto';

export class CarDetailsService {
  constructor(
    @Inject(AxiosService) private readonly axiosService: AxiosService,
    private readonly carRepository: CarRepository,
  ) {}
  public async getAllCarMarks(): Promise<string[]> {
    return await this.axiosService.getMarkas();
  }

  public async getAllCarModelsForMarkaId(markaId: number): Promise<void> {
    const models = await this.axiosService.getCarModelsByMarkaId(markaId);
    if (!models || models.length === 0) {
      throw new NotFoundException(
        `No models found for car brand id ${markaId}`,
      );
    }
    return models;
  }
  public async getCarsByBrand(marka: string): Promise<CarEntity[]> {
    const cars = await this.carRepository.find({ where: { marka: marka } });

    if (!cars || cars.length === 0) {
      throw new NotFoundException(`No cars found for brand ${marka}`);
    }

    return cars;
  }

  public async getCarsByRegion(region: ERegion): Promise<CarEntity[]> {
    return await this.carRepository.getCarByRegion(region);
  }

  public async getViewsOfAdvertisement(): Promise<void> {}

  public async getAveragePriceForCarByRegion(
    carId: string,
    region: ERegion,
  ): Promise<RegionAveragePriceResponseDto> {
    if (!Object.values(ERegion).includes(region)) {
      throw new BadRequestException('Invalid region');
    }
    if (!carId && !region) {
      throw new BadRequestException('Car id and Region are required');
    }

    const cars = await this.carRepository.getCarByRegion(region);

    const totalPrice = cars.reduce((total, car) => total + car.price, 0);
    const averagePrice = cars.length ? totalPrice / cars.length : 0;

    return new RegionAveragePriceResponseDto(averagePrice, region);
  }
  public async getAveragePriceForCarForUkraine(): Promise<number> {
    const allCars = await this.carRepository.find();
    console.log(allCars);

    const totalPrice = allCars.reduce((total, car) => total + car.price, 0);

    return allCars.length ? totalPrice / allCars.length : 0;
  }
}
