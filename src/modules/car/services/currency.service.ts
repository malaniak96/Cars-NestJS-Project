import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { format } from 'date-fns';

@Injectable()
export class CurrencyService {
  public async convertCurrency(
    amount: number,
    currency: string,
  ): Promise<string> {
    const exchangeRate = await this.getExchangeRates();
    const foundRate = exchangeRate.find((obj: any) => obj.ccy === currency);

    if (currency === 'UAH' || !foundRate) {
      return `${amount} UAH. Exchange rate not available.`;
    }

    const buyRate = parseFloat(foundRate.buy).toFixed(2);
    const calculation = (amount * parseFloat(buyRate)).toFixed(2);

    return `${calculation} UAH. Exchange rate = ${buyRate}`;
  }

  private async getExchangeRates(): Promise<any[]> {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyyMMdd');

    // const currentDate = new Date();
    // const day = currentDate.getDate().toString().padStart(2, '0');
    // const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    // const year = currentDate.getFullYear().toString();

    const PRIVATBANK_EXCHANGE_RATES_URL = `https://api.privatbank.ua/p24api/pubinfo?json&exchange&date=${formattedDate}`;

    const response = await axios.get(PRIVATBANK_EXCHANGE_RATES_URL);

    console.log(response);
    return response.data;
  }
}
