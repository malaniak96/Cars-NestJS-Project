import { Column, Entity, OneToMany } from 'typeorm';
import { TableNameEnum } from './enums/table-names.enum';
import { BaseEntity } from './models/base.entity';

import { CarModelsEntity } from './car-models.entity';

@Entity(TableNameEnum.CAR_BRANDS)
export class CarBrandsEntity extends BaseEntity {
  @Column('text')
  marka: string;

  @OneToMany(() => CarModelsEntity, (carModel) => carModel.marka)
  models?: CarModelsEntity[];
}
