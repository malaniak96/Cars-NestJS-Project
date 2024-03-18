import { IsArray, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class MarkasRequestDto {
  @IsArray()
  @Transform(TransformHelper.trim)
  @Type(() => String)
  marka: string;

  @IsString()
  @IsOptional()
  id?: string;
}
