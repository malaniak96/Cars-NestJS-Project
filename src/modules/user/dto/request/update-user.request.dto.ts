import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserBaseRequestDto } from './base-user.request.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ERole } from '../../../../common/enums/role.enum';
import { EAccountTypes } from '../../enums/account-types.enum';

export class UserUpdateRequestDto extends PickType(UserBaseRequestDto, []) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  userName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  role?: ERole;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  typeAccount?: EAccountTypes;
}
