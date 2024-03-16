import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CarAdsService } from './services/car-ads.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ERole } from '../../common/enums/role.enum';
import { Roles } from '../../common/decorators/roles';
import { RoleGuard } from '../../common/guards/roles.guard';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { CurrencyService } from './services/currency.service';
import { CreateCarAdsRequestDto } from './dto/request/create-car-ads.request.dto';
import { IUser } from '../../interfaces/user.interface';
import { CarAdsResponseDto } from './dto/response/car-ads.response.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import {
  CarStatusChangeRequestDto,
  EditCarAdsRequestDto,
} from './dto/request/edit-car-ads.request.dto';
import { BannedWordsGuard } from '../../common/guards/banned-words.guard';
import { CarsAdsListRequestDto } from './dto/request/car-ads-list.request.dto';
import { CarsAdsListResponseDto } from './dto/response/car-ads-list.response.dto';

@ApiTags('Cars')
@Controller('cars')
export class CarAdsController {
  constructor(
    private readonly carService: CarAdsService,
    private readonly currencyService: CurrencyService,
  ) {}

  @ApiBearerAuth()
  @Roles(ERole.SELLER, ERole.MANAGER, ERole.ADMIN)
  @UseGuards(RoleGuard, BannedWordsGuard)
  @ApiOperation({ summary: 'Create Car Advertisement' })
  @Post()
  public async createCarAdvertisement(
    @Body() createCar: CreateCarAdsRequestDto,
    @CurrentUser() user: IUser,
  ): Promise<CarAdsResponseDto> {
    return await this.carService.createCarAdvertisement(createCar, user);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Find all Car Advertisements' })
  @Get()
  public async findAllCarAdvertisements(
    @Query() query: CarsAdsListRequestDto,
  ): Promise<CarsAdsListResponseDto> {
    return await this.carService.findAllCarAdvertisements(query);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Get Car Advertisement by Car Id' })
  @Get(':carId')
  public async getCarAdvertisementById(
    @Param('carId', ParseUUIDPipe) carId: string,
  ): Promise<CarAdsResponseDto> {
    return await this.carService.getCarAdvertisementById(carId);
  }

  @ApiBearerAuth()
  @Roles(ERole.SELLER, ERole.MANAGER, ERole.ADMIN)
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'See all of my Car Advertisements' })
  @Get('my-cars')
  public async findMyCarAdvertisements(
    // @Param('userId') userId: string,
    @Query() query: CarsAdsListRequestDto,
    @CurrentUser() user: IUser,
  ): Promise<CarsAdsListResponseDto> {
    return await this.carService.findMyCarAdvertisements(query, user);
  }
  @ApiBearerAuth()
  @Roles(ERole.SELLER, ERole.MANAGER, ERole.ADMIN)
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'De-active or Activate Car Advertisement' })
  @Patch('car-status:carId')
  public async changeCarStatus(
    @Param('carId') carId: string,
    @Body() dto: CarStatusChangeRequestDto,
    @CurrentUser() user: IUser,
  ): Promise<CarAdsResponseDto> {
    return await this.carService.changeCarStatus(carId, user, dto);
  }
  @ApiBearerAuth()
  @Roles(ERole.SELLER, ERole.MANAGER, ERole.ADMIN)
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'Edit my Car Advertisement by Car Id' })
  @Patch(':carId')
  public async editMyCarAdvertisementById(
    @Param('carId', ParseUUIDPipe) carId: string,
    @Body() dto: EditCarAdsRequestDto,
    @CurrentUser() user: IUser,
  ): Promise<CarAdsResponseDto> {
    return await this.carService.editMyCarAdvertisementById(carId, user, dto);
  }

  @ApiBearerAuth()
  @Roles(ERole.SELLER, ERole.MANAGER, ERole.ADMIN)
  @UseGuards(RoleGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete my Car Advertisement by Car Id' })
  @Delete(':carId')
  public async deleteMyCarAdvertisementById(
    @Param('carId', ParseUUIDPipe) carId: string,
    @CurrentUser() user: IUser,
  ): Promise<void> {
    await this.carService.deleteMyCarAdvertisementById(carId, user);
  }
  @SkipAuth()
  @Get('convert-price')
  async convertPrice(
    @Query('price') amount: number,
    @Query('currency') currency: string,
  ): Promise<string> {
    return await this.currencyService.convertCurrency(amount, currency);
  }
}
