import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { CreateCarAdsRequestDto } from '../dto/request/create-car-ads.request.dto';
import {
  CarAdPremiumResponseDto,
  CarAdsResponseDto,
} from '../dto/response/car-ads.response.dto';
import { CarRepository } from '../../repositories/services/car.repository';
import { IUser } from '../../../interfaces/user.interface';
import { UserService } from '../../user/services/user.service';
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
import { CarAdsViewsService } from './car-ads-views.service';
import { ECurrency } from '../enums/currency.enum';
import { CarCurrencyService } from './car-currency.service';
import { UserResponseDto } from '../../user/dto/response/user.response.dto';

@Injectable()
export class CarAdsService {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly carAdsViewsService: CarAdsViewsService,
    private readonly userService: UserService,
    private readonly carCurrencyService: CarCurrencyService,
  ) {}
  public async createCarAdvertisement(
    createCar: CreateCarAdsRequestDto,
    user: IUser,
  ): Promise<CarAdsResponseDto> {
    createCar.status = ECarStatus.ACTIVE;

    const exchangeRates = await this.carCurrencyService.getExchangeRates();
    //
    const eurExchangeRate = exchangeRates.find(
      (rate) => rate.ccy === ECurrency.EUR,
    );
    const usdExchangeRate = exchangeRates.find(
      (rate) => rate.ccy === ECurrency.USD,
    );
    const convertedAmounts = await this.carCurrencyService.convertCurrency(
      createCar,
      eurExchangeRate,
      usdExchangeRate,
    );
    const eurExchangeRateFromAPI = exchangeRates.find(
      (rate: any) => rate.ccy === 'EUR',
    )?.buy;
    const usdExchangeRateFromAPI = exchangeRates.find(
      (rate: any) => rate.ccy === 'USD',
    )?.buy;
    if (!eurExchangeRateFromAPI || !usdExchangeRateFromAPI) {
      throw new Error('Exchange rates for USD and EUR not found.');
    }

    const partialCar = {
      ...createCar,
      user_id: user.userId,
      USD: convertedAmounts.USD,
      EUR: convertedAmounts.EUR,
      UAH: convertedAmounts.UAH,
      usdExchangeRate: eurExchangeRateFromAPI,
      eurExchangeRate: usdExchangeRateFromAPI,
    };
    const savedCar = await this.carRepository.save(partialCar);

    return await this.carRepository.save(
      this.carRepository.create({ user, ...savedCar }),
    );
  }

  public async findAllCarAdvertisements(
    query: CarsAdsListRequestDto,
  ): Promise<CarsAdsListResponseDto> {
    const [entities, total] =
      await this.carRepository.findAllCarAdvertisements(query);
    return CarAdsMapper.toListResponseDto(entities, total, query);
  }

  public async getCarAdvertisementById(
    carId: string,
  ): Promise<CarAdsResponseDto> {
    const car = await this.carRepository.getCarById(carId);
    if (!car) {
      throw new UnprocessableEntityException(
        `Car with id ${carId} was not found`,
      );
    }
    return CarAdsMapper.toResponseDto(car);
  }

  public async getCarAdByIdPremium(
    carId: string,
    region: ERegion,
  ): Promise<CarAdPremiumResponseDto> {
    await this.carAdsViewsService.trackCarView(carId);

    const car = await this.carRepository.getCarById(carId);
    if (!car) {
      throw new UnprocessableEntityException(
        `Car with id ${carId} was not found`,
      );
    }

    const carsInUkraine = await this.carRepository.getCarsinUkraine();
    const ukraineCarsWithUAH = carsInUkraine.filter((car) => car.UAH);

    const carsByRegion = await this.carRepository.getCarsByRegion(region);
    const regionCarsWithUAH = carsByRegion.filter((car) => car.UAH);

    const totalPriceInUkraine = ukraineCarsWithUAH.reduce(
      (total, car) => total + car.UAH!,
      0,
    );
    const averagePriceInUkraine =
      ukraineCarsWithUAH.length > 0
        ? totalPriceInUkraine / ukraineCarsWithUAH.length
        : 0;

    const totalPriceByRegion = regionCarsWithUAH.reduce(
      (total, car) => total + car.UAH!,
      0,
    );
    const averagePriceByRegion =
      regionCarsWithUAH.length > 0
        ? totalPriceByRegion / regionCarsWithUAH.length
        : 0;

    const [viewsToday, viewsWeek, viewsMonth] = await Promise.all([
      this.carAdsViewsService.getViewCountForPeriod(carId, 'day'),
      this.carAdsViewsService.getViewCountForPeriod(carId, 'week'),
      this.carAdsViewsService.getViewCountForPeriod(carId, 'month'),
    ]);
    car.viewsToday = viewsToday;
    car.viewsThisWeek = viewsWeek;
    car.viewsThisMonth = viewsMonth;
    car.totalViews += viewsToday;
    console.log('Total Price By Region:', totalPriceByRegion);
    const user: UserResponseDto = await this.userService.getUserByIdWithCars(
      car.user_id,
    );

    const responseDto: CarAdPremiumResponseDto = {
      ...car,
      user,
      averagePriceByRegion: `${averagePriceByRegion.toFixed(2)} UAH`,
      averagePriceInUkraine: `${averagePriceInUkraine.toFixed(2)} UAH`,
    };

    return responseDto;
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

  async getUserAdvertisementCount(userId: string): Promise<number> {
    return await this.carRepository.getAdvertisementCountForUser(userId);
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
