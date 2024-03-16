import {
  IsEnum,
  IsNumber,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { ECurrency } from '../../enums/currency.enum';
import { ECarStatus } from '../../enums/car-ads-status.enum';
import { ERegion } from '../../enums/region.enum';
import { EAccountTypes } from '../../../user/enums/account-types.enum';

export class BaseCarAdsRequestDto {
  @IsString()
  @Length(0, 100)
  @Transform(TransformHelper.trimmer)
  @Type(() => String)
  title: string;

  @IsNumber()
  @Min(1900)
  // @MaxDate(Date: Date | (() => Date))
  @Max(new Date().getUTCFullYear())
  year: number;

  @IsNumber()
  @Min(1000)
  price: number;

  @Transform(TransformHelper.trimUpperCase)
  // @IsCurrency(options?: IsCurrencyOptions)
  @IsEnum(ECurrency)
  currency: ECurrency;

  @IsString()
  @Transform(TransformHelper.trim)
  @Length(2, 30)
  marka: string;

  @IsString()
  @Transform(TransformHelper.trim)
  @Length(2, 30)
  model: string;

  @IsString()
  @Length(0, 8000)
  @Transform(TransformHelper.trimmer)
  @Type(() => String)
  description: string;

  @IsEnum(ERegion)
  @MinLength(4)
  @MaxLength(30)
  region: ERegion;

  @IsString()
  photo?: string;

  @IsEnum({ type: 'enum', enum: EAccountTypes, default: ECarStatus.NOT_ACTIVE })
  status: ECarStatus;
}
