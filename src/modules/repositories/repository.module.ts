import { Global, Module } from '@nestjs/common';
import { UserRepository } from './services/user.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { CarRepository } from './services/car.repository';
import { CarModelsRepository } from './services/car-models.repository';
import { CarBrandsRepository } from './services/car-brands.repository';

const repositories = [
  UserRepository,
  RefreshTokenRepository,
  CarRepository,
  CarBrandsRepository,
  CarModelsRepository,
  CarModelsRepository,
  CarBrandsRepository,
];

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
