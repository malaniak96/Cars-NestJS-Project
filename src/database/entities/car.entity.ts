import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from './models/base.entity';
import { TableNameEnum } from './enums/table-names.enum';
import { ERole } from '../../common/enums/role.enum';
import { ECarStatus } from '../../modules/car/enums/car-status.enum';
import { ECurrency } from '../../modules/car/enums/currency.enum';

@Entity(TableNameEnum.CAR)
export class CarEntity extends BaseEntity {
  @Column({ type: 'text' })
  model: string;

  @Column({ type: 'text' })
  brand: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'int' })
  price: number;

  @Column({ enum: ECurrency })
  currency: ECurrency;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  photo: string;

  @Column({ type: 'enum', enum: ECarStatus })
  status: ECarStatus;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
