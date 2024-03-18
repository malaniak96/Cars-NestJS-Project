import { IsArray, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TransformHelper } from '../../../../common/helpers/transform.helper';

export class AddMarkasRequestDto {
  @IsArray()
  @Transform(TransformHelper.trimArray)
  @IsString({ each: true })
  @Type(() => String)
  markas: string[];

  @IsString()
  @IsOptional()
  id?: string;
}
