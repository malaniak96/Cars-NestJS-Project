import { ERole } from '../common/enums/role.enum';
import { EAccountTypes } from '../modules/user/enums/account-types.enum';
import { CreditCardInfo } from './credit-card.interface';

export interface IUser {
  userId: string;
  name: string;
  userName: string;
  email: string;
  password: string;
  typeAccount: EAccountTypes;
  role: ERole;
  deviceId: string;
  blocked: boolean;
  creditCardInfo?: CreditCardInfo;
}
