import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { format } from 'date-fns';

@Injectable()
export class CurrencyService {
  private async getExchangeRates(): Promise<any[]> {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyyMMdd');

    const PRIVATBANK_EXCHANGE_RATES_URL = `https://api.privatbank.ua/p24api/pubinfo?json&exchange&date=${formattedDate}`;

    const response = await axios.get(PRIVATBANK_EXCHANGE_RATES_URL);

    console.log(response);
    return response.data;
  }
  public async convertCurrency(
    amount: number,
    currency: string,
  ): Promise<string> {
    const exchangeRate = await this.getExchangeRates();
    const foundRate = exchangeRate.find(
      (obj: any) => obj.ccy === currency.toUpperCase(),
    );

    if (currency === 'UAH' || !foundRate) {
      return `${amount} UAH. Exchange rate not available.`;
    }

    const buyRate = parseFloat(foundRate.buy).toFixed(2);
    const calculation = (amount * parseFloat(buyRate)).toFixed(2);

    return `${calculation} UAH. Exchange rate = ${buyRate}`;
  }
}
