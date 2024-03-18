import { EAccountTypes } from '../../enums/account-types.enum';
import { ERole } from '../../../../common/enums/role.enum';
import { CarAdsResponseDto } from '../../../car/dto/response/car-ads.response.dto';
import { CarsAdsListResponseDto } from '../../../car/dto/response/car-ads-list.response.dto';

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
  cars?: CarAdsResponseDto[];
}
export class UserDetailsResponseDto {
  id: string;
  name: string;
  userName: string;
  email: string;
  role: ERole;
  typeAccount: EAccountTypes;
  created: Date;
  updated: Date;
  blocked: boolean;
  cars: CarsAdsListResponseDto[];
}
