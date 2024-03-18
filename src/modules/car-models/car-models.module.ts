import { Module } from '@nestjs/common';
import { CarModelsService } from './services/car-models.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CarModelsService],
  exports: [CarModelsService],
})
export class CarModelsModule {}
