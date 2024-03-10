import { PickType } from '@nestjs/swagger';
import { UserBaseRequestDto } from './base-user.request.dto';

export class UserCreateRequestDto extends PickType(UserBaseRequestDto, [
  'name',
  'userName',
  'email',
  'password',
  'role',
]) {}
