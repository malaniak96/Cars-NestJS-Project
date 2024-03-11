import { ERole } from '../common/enums/role.enum';

export interface IAdmin {
  adminId: string;
  name: string;
  userName: string;
  email: string;
  password: string;
  role: ERole.ADMIN;
  deviceId: string;
}
