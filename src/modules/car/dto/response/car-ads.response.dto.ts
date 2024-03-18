import { ECurrency } from '../../enums/currency.enum';
import { UserResponseDto } from '../../../user/dto/response/user.response.dto';

import { ECarStatus } from '../../enums/car-ads-status.enum';

export class CarAdsResponseDto {
  id: string;
  title: string;
  year: number;
  marka?: string;
  model?: string;
  price: number;
  currency: ECurrency;
  UAH: number;
  USD: number;
  EUR: number;
  usdExchangeRate: number;
  eurExchangeRate: number;
  description: string;
  region: string;
  photo: string;
  created: Date;
  updated: Date;
  status: ECarStatus;
  user: UserResponseDto;
}
export class CarAdPremiumResponseDto {
  id: string;
  title: string;
  year: number;
  marka?: string;
  model?: string;
  price: number;
  currency: ECurrency;
  UAH: number;
  USD: number;
  EUR: number;
  usdExchangeRate: number;
  eurExchangeRate: number;
  description: string;
  region: string;
  photo: string;
  created: Date;
  updated: Date;
  status: ECarStatus;
  user: UserResponseDto;
  totalViews?: number;
  viewsToday?: number;
  viewsThisWeek?: number;
  viewsThisMonth?: number;
  averagePriceByRegion?: string;
  averagePriceInUkraine?: string;
}
