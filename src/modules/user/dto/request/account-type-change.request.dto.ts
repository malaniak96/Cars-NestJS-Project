import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserBaseRequestDto } from './base-user.request.dto';
import { IsOptional, IsString } from 'class-validator';
import { EAccountTypes } from '../../enums/account-types.enum';

export class AccountTypeChangeRequestDto extends PickType(
  UserBaseRequestDto,
  [],
) {
  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  typeAccount: EAccountTypes;
}
