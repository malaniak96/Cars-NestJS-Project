import { CarEntity } from '../../../database/entities/car.entity';

import { UserMapper } from '../../user/services/user.mapper';
import { CarAdsResponseDto } from '../dto/response/car-ads.response.dto';
import { CarsAdsListResponseDto } from '../dto/response/car-ads-list.response.dto';
import { CarsAdsListRequestDto } from '../dto/request/car-ads-list.request.dto';

export class CarAdsMapper {
  public static toResponseDto(carEntity: CarEntity): CarAdsResponseDto {
    return {
      id: carEntity.id,
      title: carEntity.title,
      year: carEntity.year,
      marka: carEntity.marka,
      model: carEntity.model,
      price: carEntity.price,
      currency: carEntity.currency,
      description: carEntity.description,
      region: carEntity.region,
      photo: carEntity.photo,
      created: carEntity.created,
      updated: carEntity.updated,
      status: carEntity.status,
      user: carEntity.user ? UserMapper.toResponseDto(carEntity.user) : null,
    };
  }
  public static toListResponseDto(
    entities: CarEntity[],
    total: number,
    query: CarsAdsListRequestDto,
  ): CarsAdsListResponseDto {
    return {
      data: entities.map(this.toResponseDto),
      meta: {
        limit: query.limit,
        offset: query.offset,
        total,
      },
    };
  }
}
