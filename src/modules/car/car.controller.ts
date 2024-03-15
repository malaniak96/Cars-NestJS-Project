import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CarService } from './services/car.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseCarRequestDto } from './dto/request/base-car.request.dto';
import { ECurrency } from './enums/currency.enum';
import { ERole } from '../../common/enums/role.enum';
import { Roles } from '../../common/decorators/roles';
import { RoleGuard } from '../../common/guards/roles.guard';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { ICar } from '../../interfaces/car.interface';
import { CurrencyService } from './services/currency.service';

@Roles(ERole.ADMIN, ERole.MANAGER)
@ApiTags('Cars')
@Controller('car')
export class CarController {
  constructor(
    private readonly carService: CarService,
    private readonly currencyService: CurrencyService,
  ) {}

  @SkipAuth()
  @Get('convert-price')
  async convertPrice(
    @Query('price') amount: number,
    @Query('currency') currency: string,
  ): Promise<string> {
    return await this.currencyService.convertCurrency(amount, currency);
  }

  @Post()
  create(@Body() createCarDto: BaseCarRequestDto) {
    return this.carService.create(createCarDto);
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Get all car brands' })
  @Get('marks') // Route: /cars/marks
  async getAllCarMarks(): Promise<any> {
    return await this.carService.getAllCarMarks();
  }

  @SkipAuth()
  @ApiOperation({ summary: 'Get all car models' })
  @Get('marks') // Route: /cars/marks
  async getAllCarModels(markaId: number): Promise<any> {
    return await this.carService.getAllCarModels(markaId);
  }
}
// @Get(':id')
// findOne(@Param('id') id: string) {
//   return this.carService.findOne(+id);
// }
//
// @Patch(':id')
// update(@Param('id') id: string, @Body() updateCarDto: UpdateCarRequestDto) {
//   return this.carService.update(+id, updateCarDto);
// }
//
// @Delete(':id')
// remove(@Param('id') id: string) {
//   return this.carService.remove(+id);
// }
