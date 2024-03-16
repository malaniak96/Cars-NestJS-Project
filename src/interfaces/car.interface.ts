import { ECurrency } from '../modules/car/enums/currency.enum';

export class ICar {
  id: string;
  title: string;
  year: number;
  price: number;
  model: { model: string };
  marka: { marka: string };
  currency: ECurrency;
  description: string;
  photo: string;
  region: string;
  status: string;
}
