import { IsEnum, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { ECurrency } from '../../enums/currency.enum';
import { ECarStatus } from '../../enums/car-status.enum';

export class BaseCarRequestDto {
  @IsNumber()
  @Min(1900)
  // @MaxDate(Date: Date | (() => Date))
  @Max(new Date().getUTCFullYear())
  year: number;

  @IsNumber()
  price: number;

  @Transform(TransformHelper.trimCurrency)
  // @IsCurrency(options?: IsCurrencyOptions)
  @IsEnum(ECurrency)
  currency: ECurrency;

  @IsString()
  @Transform(TransformHelper.trim)
  @Length(2, 30)
  marka: string;

  @IsString()
  @Transform(({ value }) => value.trim().toLowerCase())
  @Length(2, 30)
  model: string;

  @IsString()
  @Length(0, 8000)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  description: string;

  @IsString()
  photo: string;

  @IsEnum({ type: 'enum', enum: ECarStatus, default: ECarStatus.ACTIVE })
  status: ECarStatus;
}
