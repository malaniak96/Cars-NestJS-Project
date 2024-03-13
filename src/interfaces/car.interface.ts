import { ECurrency } from '../modules/car/enums/currency.enum';

export class ICar {
  id: string;
  year: number;
  price: number;
  model: { model: string };
  brand: { brand: string };
  currency: ECurrency;
  description: string;
  photo: string;
  status: string;
}
