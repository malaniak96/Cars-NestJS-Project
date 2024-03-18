import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TableNameEnum } from './enums/table-names.enum';
import { BaseEntity } from './models/base.entity';
import { CarBrandsEntity } from './car-brands.entity';

@Entity(TableNameEnum.CAR_MODELS)
export class CarModelsEntity extends BaseEntity {
  @Column('text')
  model: string;

  @Column()
  marka_id: string;
  @ManyToOne(() => CarBrandsEntity, (carBrand) => carBrand.models)
  @JoinColumn({ name: 'marka_id' })
  marka?: CarBrandsEntity;
}
