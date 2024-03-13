import { ECurrency } from '../../enums/currency.enum';

export class CarResponseDto {
  id: string;
  year: number;
  brand: string;
  model: string;
  price: number;
  currency: ECurrency;
  description: string;
  photo: string;
  status: string;
  created: Date;
  updated: Date;
}
