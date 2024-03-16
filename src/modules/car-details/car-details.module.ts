import { Module } from '@nestjs/common';
import { CarDetailsService } from './services/car-details.service';
import { CarDetailsController } from './car-details.controller';
import { AxiosService } from './services/axios.service';
import { CarRepository } from '../repositories/services/car.repository';

@Module({
  imports: [],
  providers: [CarDetailsService, AxiosService, CarRepository],
  controllers: [CarDetailsController],
})
export class CarDetailsModule {}
