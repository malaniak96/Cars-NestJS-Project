import { Global, Module } from '@nestjs/common';
import { UserRepository } from './services/user.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { AdminRepository } from './services/admin.repository';
import { ManagerRepository } from './services/manager.repository';

const repositories = [
  UserRepository,
  RefreshTokenRepository,
  AdminRepository,
  ManagerRepository,
];

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
