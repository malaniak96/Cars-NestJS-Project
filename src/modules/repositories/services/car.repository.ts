import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CarEntity } from '../../../database/entities/car.entity';

import { IUser } from '../../../interfaces/user.interface';
import { CarsAdsListRequestDto } from '../../car/dto/request/car-ads-list.request.dto';
import { ERegion } from '../../car/enums/region.enum';

@Injectable()
export class CarRepository extends Repository<CarEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarEntity, dataSource.manager);
  }

  public async findAllCarAdvertisements(
    query: CarsAdsListRequestDto,
  ): Promise<[CarEntity[], number]> {
    const queryBuilder = this.createQueryBuilder('cars');
    queryBuilder.leftJoinAndSelect('cars.user', 'user');

    if (query.search) {
      queryBuilder.andWhere(
        'CONCAT(LOWER(car.title), LOWER(car.model), LOWER(car.mark), LOWER(car.description)) LIKE :search',
      );
      queryBuilder.setParameter('search', `%${query.search.toLowerCase()}%`);
    }

    queryBuilder.addOrderBy('cars.created', 'DESC');
    queryBuilder.take(query.limit);
    queryBuilder.skip(query.offset);
    return await queryBuilder.getManyAndCount();
  }

  public async findAllMyCarAdvertisements(
    query: CarsAdsListRequestDto,
    user: IUser,
  ): Promise<[CarEntity[], number]> {
    const queryBuilder = this.createQueryBuilder('cars');
    queryBuilder.leftJoinAndSelect('cars.user', 'user');
    queryBuilder.andWhere('user_id=:my', { my: user.userId });

    queryBuilder.addOrderBy('cars.created', 'DESC');
    queryBuilder.take(query.limit);
    queryBuilder.skip(query.offset);
    return await queryBuilder.getManyAndCount();
  }

  public async getCarById(carId: string): Promise<CarEntity> {
    const queryBuilder = this.createQueryBuilder('car');
    queryBuilder.leftJoinAndSelect('car.user', 'user');

    queryBuilder.where('car.id = :carId', { carId });
    return await queryBuilder.getOne();
  }

  public async getCarByRegions(carId: string): Promise<CarEntity[]> {
    const queryBuilder = this.createQueryBuilder('car');
    queryBuilder.leftJoinAndSelect('car.region', 'region');

    queryBuilder.where('car.id = :carId', { carId });
    // queryBuilder.addOrderBy('cars.created', 'DESC');
    // queryBuilder.take(query.limit);
    // queryBuilder.skip(query.offset);
    return await queryBuilder.getMany();
  }

  public async getCarByRegion(region: ERegion): Promise<CarEntity[]> {
    const cars = await this.find({ where: { region } });

    if (!cars || cars.length === 0) {
      throw new NotFoundException(`No cars found for region ${region}`);
    }

    return cars;
  }
}
