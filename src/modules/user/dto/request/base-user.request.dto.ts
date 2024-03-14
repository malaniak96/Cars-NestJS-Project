import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { ERole } from '../../../../common/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsRoleBuyerORSeller } from '../../../../common/decorators/role-validator';

export class UserBaseRequestDto {
  @IsString()
  @IsOptional()
  @Length(0, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name?: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  userName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'test@gmail.com' })
  @Transform(TransformHelper.trimEmail)
  @Length(0, 300)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trimPassword)
  @ApiProperty({ example: 'okten24@' })
  @Length(0, 30)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
  password: string;

  @Transform(TransformHelper.trim)
  @IsString()
  @IsNotEmpty()
  @IsRoleBuyerORSeller()
  role: ERole;
}
