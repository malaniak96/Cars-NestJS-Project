import { PickType } from '@nestjs/swagger';
import { BaseCarAdsRequestDto } from './base-car-ads.request.dto';
export class CreateCarAdsRequestDto extends PickType(BaseCarAdsRequestDto, [
  'title',
  'year',
  'price',
  'currency',
  'marka',
  'model',
  'description',
  'region',
  'photo',
  'status',
]) {}
