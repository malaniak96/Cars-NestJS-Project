import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import axios from 'axios';
import { format } from 'date-fns';
import { ECurrency } from '../enums/currency.enum';
import { CreateCarAdsRequestDto } from '../dto/request/create-car-ads.request.dto';
import { IExchangeRate } from '../../../interfaces/exchange-rate.interface';
import { ICurrency } from '../../../interfaces/currency.interface';

@Injectable()
export class CarCurrencyService {
  public async getExchangeRates(): Promise<any[]> {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyyMMdd');

    const PRIVATBANK_EXCHANGE_RATES_URL = `https://api.privatbank.ua/p24api/pubinfo?json&exchange&date=${formattedDate}`;

    const response = await axios.get(PRIVATBANK_EXCHANGE_RATES_URL);

    return response.data;
  }
  public async convertCurrency(
    createCar: CreateCarAdsRequestDto,
    eurExchangeRate: IExchangeRate,
    usdExchangeRate: IExchangeRate,
  ): Promise<ICurrency> {
    const exchangeRates = {
      EUR: eurExchangeRate,
      USD: usdExchangeRate,
      UAH: ECurrency.UAH,
    };
    const selectedExchangeRate = exchangeRates[createCar.currency];

    if (!selectedExchangeRate) {
      throw new UnprocessableEntityException('Invalid currency provided');
    }

    const convertedAmounts = {} as ICurrency;

    switch (createCar.currency) {
      case ECurrency.EUR:
        convertedAmounts.EUR = parseFloat(createCar.price.toFixed(2));
        convertedAmounts.UAH = parseFloat(
          (createCar.price * eurExchangeRate.buy).toFixed(2),
        );
        convertedAmounts.USD = parseFloat(
          (convertedAmounts.UAH / usdExchangeRate.sale).toFixed(2),
        );
        break;
      case ECurrency.USD:
        convertedAmounts.USD = parseFloat(createCar.price.toFixed(2));
        convertedAmounts.UAH = parseFloat(
          (createCar.price * usdExchangeRate.buy).toFixed(2),
        );
        convertedAmounts.EUR = parseFloat(
          (convertedAmounts.UAH / eurExchangeRate.sale).toFixed(2),
        );
        break;
      case ECurrency.UAH:
        convertedAmounts.UAH = parseFloat(createCar.price.toFixed(2));
        convertedAmounts.USD = parseFloat(
          (createCar.price * usdExchangeRate.sale).toFixed(2),
        );
        convertedAmounts.EUR = parseFloat(
          (createCar.price * eurExchangeRate.sale).toFixed(2),
        );
        break;
      default:
        throw new UnprocessableEntityException('Invalid currency provided');
    }

    return convertedAmounts;
  }
}
