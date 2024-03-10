import { Column, Entity, OneToMany } from 'typeorm';

import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-names.enum';
import { BaseEntity } from './models/base.entity';
import { ERole } from '../../modules/auth/roles/enum/role.enum';
import { EAccountTypes } from '../../modules/user/enums/account-types.enum';

@Entity(TableNameEnum.USER)
export class UserEntity extends BaseEntity {
  @Column('text')
  name: string;

  @Column('text')
  userName: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @Column({ type: 'enum', enum: ERole })
  role: ERole;

  @Column({ type: 'enum', enum: EAccountTypes, default: EAccountTypes.BASIC })
  typeAccount: EAccountTypes;

  @OneToMany(() => CarEntity, (entity) => entity.user)
  cars: CarEntity[];

  // @ManyToOne(() => Role, (role) => role.USER)
  // role: RoleEntity;
  //
  // @OneToMany(() => Advertisement, advertisement => advertisement.seller)
  // advertisements: Advertisement[];

  // @OneToOne(() => RoleEntity, (entity) => entity.user)
  // role: RoleEntity;
  //
  // @OneToMany(() => CarEntity, (entity) => entity.user)
  // cars: CarEntity;
}
