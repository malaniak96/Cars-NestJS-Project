import { ECurrency } from '../../enums/currency.enum';
import { UserResponseDto } from '../../../user/dto/response/user.response.dto';
import { IsEnum } from 'class-validator';
import { ECarStatus } from '../../enums/car-ads-status.enum';
import { Column } from 'typeorm';

export class CarAdsResponseDto {
  id: string;
  title: string;
  year: number;
  marka: string;
  model: string;
  price: number;
  currency: ECurrency;
  description: string;
  region: string;
  photo: string;
  created: Date;
  updated: Date;
  status: ECarStatus;
  user?: UserResponseDto;
}
