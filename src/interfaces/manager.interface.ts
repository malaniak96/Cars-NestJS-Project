import { ERole } from '../common/enums/role.enum';

export interface IManager {
  managerId: string;
  name: string;
  userName: string;
  email: string;
  password: string;
  role: ERole.MANAGER;
  deviceId: string;
}
