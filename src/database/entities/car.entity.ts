import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from './models/base.entity';
import { TableNameEnum } from './enums/table-names.enum';

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

  @Column({ type: 'text' })
  description: number;

  @ManyToOne(() => UserEntity, (entity) => entity.cars)
  user: UserEntity;
}
