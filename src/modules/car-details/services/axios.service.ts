import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AxiosService {
  public async getMarkas() {
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

  public async getCarModelsByMarkaId(markaId: number) {
    const url = `https://developers.ria.com/auto/new/models?marka_id=${markaId}&category_id=1&api_key=VqhxyS60I9PoJH7Cpgijq23khA7JehPeASnGvZ9M`;

    return axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        throw new Error(`Failed to fetch car models: ${error.message}`);
      });
  }
}
