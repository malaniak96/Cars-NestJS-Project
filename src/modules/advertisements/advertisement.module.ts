import { Module } from '@nestjs/common';
import { AdvertisementService } from './services/advertisement.service';
import { AdvertisementController } from './advertisement.controller';

@Module({
  imports: [],
  providers: [AdvertisementService],
  controllers: [AdvertisementController],
})
export class AdvertisementModule {}
