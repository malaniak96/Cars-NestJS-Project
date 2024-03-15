import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './services/car.service';
import { HttpModule } from '@nestjs/axios';
import { CurrencyService } from './services/currency.service';

@Module({
  imports: [HttpModule],
  controllers: [CarController],
  providers: [CarService, CurrencyService],
})
export class CarModule {}
