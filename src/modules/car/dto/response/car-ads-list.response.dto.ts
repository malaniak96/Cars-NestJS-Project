import { CarAdsResponseDto } from './car-ads.response.dto';

export class CarsAdsListResponseDto {
  data: CarAdsResponseDto[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}
