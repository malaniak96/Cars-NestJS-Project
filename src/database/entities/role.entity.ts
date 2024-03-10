import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { ERole } from '../../modules/auth/roles/enum/role.enum';
import { UserEntity } from './user.entity';
import { TableNameEnum } from './enums/table-names.enum';

@Entity(TableNameEnum.ROLE)
export class RoleEntity {
  @Column()
  name: string;

  @Column({ type: 'enum', enum: ERole, enumName: 'role_enum' })
  role: ERole;

  @JoinColumn()
  @OneToOne(() => UserEntity, (user) => user.role)
  user: UserEntity;
}
