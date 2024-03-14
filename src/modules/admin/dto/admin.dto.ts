import { ERole } from '../../../common/enums/role.enum';
import { EAccountTypes } from '../../user/enums/account-types.enum';

export const AdminDto = {
  name: '',
  userName: 'Admin',
  email: 'admin@car-market.com',
  password: 'Admin24@!',
  role: ERole.ADMIN,
  typeAccount: EAccountTypes.PREMIUM,
  deviceId: '',
};
