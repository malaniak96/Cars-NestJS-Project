import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CarModelsEntity } from '../../../database/entities/car-models.entity';

@Injectable()
export class CarModelsRepository extends Repository<CarModelsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarModelsEntity, dataSource.manager);
  }
}
