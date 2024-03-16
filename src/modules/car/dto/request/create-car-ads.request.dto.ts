import { PickType } from '@nestjs/swagger';
import { BaseCarAdsRequestDto } from './base-car-ads.request.dto';
import { ECarStatus } from '../../enums/car-ads-status.enum';
import { IsEnum } from 'class-validator';
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
