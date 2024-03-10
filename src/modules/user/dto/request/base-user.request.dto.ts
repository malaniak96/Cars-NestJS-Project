import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { ERole } from '../../../../common/enums/role.enum';
import { IsPermittedRole } from '../../../../common/decorators/role-validator';

export class UserBaseRequestDto {
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name: string;

  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  userName: string;

  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trimEmail)
  @Length(0, 300)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(TransformHelper.trim)
  @Length(0, 40)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
  password: string;

  @Transform(TransformHelper.trim)
  @IsString()
  @IsPermittedRole()
  role: ERole;
}
