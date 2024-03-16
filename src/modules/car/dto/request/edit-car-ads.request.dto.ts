import { ApiProperty, PickType } from '@nestjs/swagger';
import { BaseCarAdsRequestDto } from './base-car-ads.request.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ERole } from '../../../../common/enums/role.enum';
import { EAccountTypes } from '../../../user/enums/account-types.enum';
import { ECarStatus } from '../../enums/car-ads-status.enum';

export class EditCarAdsRequestDto extends PickType(BaseCarAdsRequestDto, [
  'price',
  'currency',
  'description',
  'photo',
]) {}

export class CarStatusChangeRequestDto extends PickType(
  BaseCarAdsRequestDto,
  [],
) {
  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  status: ECarStatus;
}
