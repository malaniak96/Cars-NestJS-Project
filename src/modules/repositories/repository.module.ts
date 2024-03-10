import { Global, Module } from '@nestjs/common';
import { UserRepository } from './services/user.repository';

const repositories = [UserRepository];

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
