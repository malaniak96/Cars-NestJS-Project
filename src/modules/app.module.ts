import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../configs/configs';
import { PostgresModule } from './postgres/postgres.module';
import { RedisModule } from './redis/redis.module';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CarAdsModule } from './car/car-ads.module';
import { AdminModule } from './admin/admin.module';
import { ManagerModule } from './manager/manager.module';
import { RepositoryModule } from './repositories/repository.module';
import { HttpModule } from '@nestjs/axios';
import { CarBrandsModule } from './car-brands/car-brands.module';

@Module({
  imports: [
    HttpModule,
    PostgresModule,
    RedisModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    AdminModule,
    ManagerModule,
    CarAdsModule,
    CarBrandsModule,
    HealthModule,
    RepositoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
