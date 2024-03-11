import { ERole } from '../../../../common/enums/role.enum';
import { EAccountTypes } from '../../../user/enums/account-types.enum';

export class ManagerResponseDto {
  id: string;
  name: string;
  userName: string;
  email: string;
  role: ERole;
  typeAccount: EAccountTypes;
  created: Date;
  updated: Date;
}
