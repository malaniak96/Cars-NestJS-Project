import { PickType } from '@nestjs/swagger';
import { UserBaseRequestDto } from './base-user.request.dto';

export class UserUpdateRequestDto extends PickType(UserBaseRequestDto, [
  'userName',
  'email',
]) {}
