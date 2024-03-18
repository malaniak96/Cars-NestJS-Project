import { ECurrency } from '../modules/car/enums/currency.enum';

export interface IExchangeRate {
  ccy: ECurrency;
  buy: number;
  sale: number;
}
