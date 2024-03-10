import { ERole } from '../common/enums/role.enum';

export interface IUser {
  userId: string;
  name: string;
  userName: string;
  email: string;
  password: string;
  role: ERole;
}
