import { Module } from '@nestjs/common';
import { CarBrandsService } from './services/car-brands.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CarBrandsService],
  exports: [CarBrandsService],
})
export class CarBrandsModule {}
