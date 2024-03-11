import { Column, Entity, OneToMany } from 'typeorm';

import { TableNameEnum } from './enums/table-names.enum';
import { BaseEntity } from './models/base.entity';

import { EAccountTypes } from '../../modules/user/enums/account-types.enum';
import { ERole } from '../../common/enums/role.enum';
import { RefreshTokenEntity } from './refresh.token.entity';

@Entity(TableNameEnum.ADMIN)
export class AdminEntity extends BaseEntity {
  @Column('text')
  name: string;

  @Column('text')
  userName: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column({ type: 'enum', enum: ERole.ADMIN })
  role: ERole.ADMIN;

  @Column({ type: 'enum', enum: EAccountTypes, default: EAccountTypes.BASIC })
  typeAccount: EAccountTypes;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];
}
