import { PickType } from '@nestjs/swagger';
import { UserBaseRequestDto } from '../../../user/dto/request/base-user.request.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class BaseAuthRequestDto extends PickType(UserBaseRequestDto, [
  'name',
  'userName',
  'email',
  'password',
  'role',
]) {
  @IsNotEmpty()
  @IsString()
  readonly deviceId: string;
}
