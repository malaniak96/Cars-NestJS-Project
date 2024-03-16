import { ERegion } from '../../car/enums/region.enum';

export class RegionAveragePriceResponseDto {
  averagePrice: number;
  region: ERegion;

  constructor(averagePrice: number, region: ERegion) {
    this.averagePrice = averagePrice;
    this.region = region;
  }
}
