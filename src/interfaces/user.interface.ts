import { ERole } from '../common/enums/role.enum';
import { EAccountTypes } from '../modules/user/enums/account-types.enum';
import { CarEntity } from '../database/entities/car.entity';

export interface IUser {
  userId: string;
  name: string;
  userName: string;
  email: string;
  typeAccount: EAccountTypes;
  role: ERole;
  deviceId: string;
  blocked: boolean;
  cars: CarEntity[];
}
