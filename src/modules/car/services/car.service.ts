import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { BaseCarRequestDto } from '../dto/request/base-car.request.dto';

import { ECurrency } from '../enums/currency.enum';
import axios from 'axios';

import { CurrencyService } from './currency.service';
import { ICar } from '../../../interfaces/car.interface';

@Injectable()
export class CarService {
  constructor(
    private readonly currencyService: CurrencyService,
    private readonly httpService: HttpService,
  ) {}

  // public async calculatePriceInCurrency(
  //   price: number,
  //   currency: ECurrency,
  //   targetCurrency: ECurrency,
  // ): Promise<number> {
  //   const priceInTargetCurrency = await this.currencyService.convertCurrency(
  //     price,
  //     currency,
  //     targetCurrency,
  //   );
  //   return priceInTargetCurrency;
  // }
  create(createCarDto: BaseCarRequestDto) {
    return 'This action adds a new car';
  }

  public async getAllCarMarks(): Promise<any> {
    const url = 'https://developers.ria.com/auto/new/marks';
    const category_id = 1;
    const api_key = 'VqhxyS60I9PoJH7Cpgijq23khA7JehPeASnGvZ9M';
    const params = { category_id, api_key };

    return axios
      .get(url, { params })
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(`Failed to fetch car marks: ${error.message}`);
      });
  }

  public async getAllCarModels(markaId: number): Promise<any> {
    const url = 'https://developers.ria.com/auto/new/models';
    const category_id = 1;
    const api_key = 'VqhxyS60I9PoJH7Cpgijq23khA7JehPeASnGvZ9M';
    const params = { marka_id: markaId, category_id, api_key };

    return axios
      .get(url, { params })
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(`Failed to fetch car models: ${error.message}`);
      });
  }
  // public async getAllCarsWithMarkaAndModel(): Promise<any[]> {
  //   try {
  //     // Fetch all cars
  //     const carsResponse = await this.httpService.get(
  //       'https://developers.ria.com/auto/search',
  //       {
  //         params: { category_id: 1 },
  //       },
  //     );
  //
  //     const cars = carsResponse.data.result.search_result;
  //
  //     // Fetch marka and model information for each car
  //     const carsWithMarkaAndModel = await Promise.all(
  //       cars.map(async (car: any) => {
  //         const markaId = car.marka_id;
  //         const modelId = car.model_id;
  //
  //         // Fetch marka and model information
  //         const markaResponse = await this.getAllCarMarks().toPromise();
  //         const marka = markaResponse.data.find(
  //           (marka: any) => marka.value === markaId,
  //         );
  //
  //         const modelResponse = await this.getAllCarModels(markaId).toPromise();
  //         const model = modelResponse.data.find(
  //           (model: any) => model.value === modelId,
  //         );
  //
  //         // Add marka and model information to the car object
  //         return {
  //           ...car,
  //           marka: marka ? marka.name : 'Unknown',
  //           model: model ? model.name : 'Unknown',
  //         };
  //       }),
  //     );
  //
  //     return carsWithMarkaAndModel;
  //   } catch (error) {
  //     throw new Error(
  //       `Failed to fetch cars with marka and model: ${error.message}`,
  //     );
  //   }
  // }
}
