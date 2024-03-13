import { EAccountTypes } from '../../enums/account-types.enum';
import { ERole } from '../../../../common/enums/role.enum';

export class UserResponseDto {
  id: string;
  name: string;
  userName: string;
  email: string;
  role: ERole;
  typeAccount: EAccountTypes;
  created: Date;
  updated: Date;
  blocked: boolean;
}
