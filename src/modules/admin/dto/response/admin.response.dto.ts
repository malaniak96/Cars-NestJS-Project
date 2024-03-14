import { ERole } from '../../../../common/enums/role.enum';

export class AdminResponseDto {
  id: string;
  name: string;
  userName: string;
  email: string;
  role: ERole;
  created: Date;
  updated: Date;
}
