import { Exclude, Transform, Type } from 'class-transformer';
import {
  IS_BOOLEAN,
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

export class CreateAdminRequestDto {
  @IsString()
  @IsOptional()
  @Length(3, 50)
  @Transform(TransformHelper.trimmer)
  @Type(() => String)
  name?: string;

  @Transform(TransformHelper.trim)
  @Length(3, 50)
  @IsString()
  userName: string;

  @Transform(TransformHelper.trimEmail)
  @ApiProperty({ example: 'admin@example.com' })
  @Length(0, 300)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  @IsString()
  @IsNotEmpty()
  email: string;

  @Transform(TransformHelper.trimPassword)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'adminPassword' })
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
