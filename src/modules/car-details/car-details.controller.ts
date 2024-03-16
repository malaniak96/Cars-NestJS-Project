import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles';
import { ERole } from '../../common/enums/role.enum';
import { EAccountTypes } from '../user/enums/account-types.enum';
import { typeAccountPremium } from '../../common/decorators/account-type-premium';
import { AccountTypeGuard } from '../../common/guards/account-type.guard';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { CarAdsService } from '../car/services/car-ads.service';
import { CarDetailsService } from './services/car-details.service';
import { ERegion } from '../car/enums/region.enum';
import { RegionAveragePriceResponseDto } from './dto/region-average-price.response.dto';
import { CarRepository } from '../repositories/services/car.repository';
import { CarEntity } from '../../database/entities/car.entity';

@ApiTags('Search Cars')
@Controller('search-cars')
export class CarDetailsController {
  constructor(
    private readonly carDetailsService: CarDetailsService,
    private readonly carRepository: CarRepository,
  ) {}

  @SkipAuth()
  @ApiOperation({ summary: 'Get all CAR BRANDS' })
  @Get('marks')
  public async getAllCarMarks(): Promise<string[]> {
    return await this.carDetailsService.getAllCarMarks();
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Get all car models for a chosen CAR BRAND' })
  @Get('models')
  public async getAllCarModelsByMarkaId(
    @Query('marka_id') markaId: number,
  ): Promise<void> {
    return await this.carDetailsService.getAllCarModelsForMarkaId(markaId);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Get all cars available for a chosen CAR BRAND' })
  @Get('/brands/:marka')
  async getCarsByBrand(@Param('marka') marka: string): Promise<CarEntity[]> {
    return await this.carDetailsService.getCarsByBrand(marka);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Get all cars available for a chosen REGION' })
  @Get('/regions/:region/cars')
  async getCarsByRegionAndMarka(
    @Param('region') region: ERegion,
  ): Promise<CarEntity[]> {
    return await this.carDetailsService.getCarsByRegion(region);
  }
  // @ApiOperation({
  //   summary: 'Get number of views of a chosen advertisement',
  // })
  // @Get()
  // private async getViewsOfAdvertisement() {}

  @SkipAuth()
  @ApiOperation({
    summary: 'Get an average price of a car for a chosen region',
  })
  @Get('average-price-by-region')
  private async getAveragePriceForCarByRegion(
    @Query('carId') carId: string,
    @Query('region') region: ERegion,
  ): Promise<RegionAveragePriceResponseDto> {
    const regionEnum: ERegion = region as ERegion;
    return await this.carDetailsService.getAveragePriceForCarByRegion(
      carId,
      regionEnum,
    );
  }

  // @ApiBearerAuth()
  // @Roles(ERole.SELLER)
  // @typeAccountPremium(EAccountTypes.PREMIUM)
  // @UseGuards(RoleGuard, AccountTypeGuard)
  @SkipAuth()
  @ApiOperation({
    summary: 'Get an average price of a car in Ukraine',
  })
  @Get('average-price')
  private async getAveragePriceForCarForUkraine(): Promise<number> {
    return await this.carDetailsService.getAveragePriceForCarForUkraine();
  }
}
