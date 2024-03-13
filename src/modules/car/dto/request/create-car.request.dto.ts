import { PickType } from '@nestjs/swagger';
import { BaseCarRequestDto } from './base-car.request.dto';

export class CreateCarRequestDto extends PickType(BaseCarRequestDto, [
  'year',
  'price',
  'currency',
  'brand',
  'model',
  'description',
  'photo',
]) {}
