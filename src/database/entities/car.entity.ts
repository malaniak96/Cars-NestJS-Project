import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from './models/base.entity';
import { TableNameEnum } from './enums/table-names.enum';
import { ECarStatus } from '../../modules/car/enums/car-ads-status.enum';
import { ECurrency } from '../../modules/car/enums/currency.enum';
import { ERegion } from '../../modules/car/enums/region.enum';

@Entity(TableNameEnum.CAR)
export class CarEntity extends BaseEntity {
  @Column('text')
  title: string;

  @Column({ type: 'text' })
  marka: string;

  @Column({ type: 'text' })
  model: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'int' })
  price: number;

  @Column({ enum: ECurrency })
  currency: ECurrency;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  UAH: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  EUR: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  USD: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  usdExchangeRate: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  eurExchangeRate: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  photo: string;

  @Column({ type: 'enum', enum: ECarStatus, default: ECarStatus.NOT_ACTIVE })
  status: ECarStatus;

  @Column({ type: 'enum', enum: ERegion })
  region: ERegion;

  @Column({ default: 0 })
  totalViews?: number;

  @Column({ default: 0 })
  viewsToday?: number;

  @Column({ default: 0 })
  viewsThisWeek?: number;

  @Column({ default: 0 })
  viewsThisMonth?: number;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  // @ManyToOne(() => CarBrandsEntity, (entity) => entity.cars)
  // mark?: CarBrandsEntity;
  //
  // @ManyToOne(() => CarModelsEntity, (entity) => entity.cars)
  // models?: CarModelsEntity[];
}
