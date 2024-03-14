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
import { IsdRoleAdminORManager } from '../../../../common/decorators/role-validator';

export class CreateManagerRequestDto {
  @IsString()
  @IsOptional()
  @Length(0, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name?: string;

  @Transform(TransformHelper.trim)
  @Length(3, 50)
  @IsString()
  userName: string;

  @Transform(TransformHelper.trimEmail)
  @Length(0, 300)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  @ApiProperty({ example: 'test@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @Transform(TransformHelper.trimPassword)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'okten243@' })
  @Length(0, 30)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
  password: string;

  @Transform(TransformHelper.trim)
  @IsString()
  @IsdRoleAdminORManager()
  role: ERole;

  @IsNotEmpty()
  @IsString()
  deviceId: string;
}
