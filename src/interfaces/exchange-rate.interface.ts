import { ECurrency } from '../modules/car/enums/currency.enum';

export interface ExchangeRate {
  ccy: ECurrency;
  buy: number;
  sale: number;
}
