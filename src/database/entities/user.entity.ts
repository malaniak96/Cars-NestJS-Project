import { Column, Entity, OneToMany } from 'typeorm';

import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-names.enum';
import { BaseEntity } from './models/base.entity';

import { EAccountTypes } from '../../modules/user/enums/account-types.enum';
import { ERole } from '../../common/enums/role.enum';
import { RefreshTokenEntity } from './refresh.token.entity';

@Entity(TableNameEnum.USER)
export class UserEntity extends BaseEntity {
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  userName: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column({ type: 'enum', enum: ERole })
  role: ERole;

  @Column({ type: 'enum', enum: EAccountTypes, default: EAccountTypes.BASIC })
  typeAccount: EAccountTypes;

  @Column({ type: 'boolean', default: false })
  blocked: boolean;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => CarEntity, (entity) => entity.user)
  cars: CarEntity[];
}
