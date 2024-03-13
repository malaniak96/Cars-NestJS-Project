import { PickType } from '@nestjs/swagger';
import { BaseCarRequestDto } from './base-car.request.dto';

export class UpdateCarRequestDto extends PickType(BaseCarRequestDto, [
  'price',
  'currency',
  'description',
]) {}
