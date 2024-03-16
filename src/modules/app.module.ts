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
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from '../common/guards/roles.guard';
import { AccountTypeGuard } from '../common/guards/account-type.guard';
import { CarDetailsModule } from './car-details/car-details.module';

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
    CarAdsModule,
    CarDetailsModule,
    AdminModule,
    ManagerModule,
    HealthModule,
    RepositoryModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: RoleGuard,
    // },
    // {
    //   provide: 'ACCOUNT_TYPE_GUARD',
    //   useClass: AccountTypeGuard,
    // },
  ],
})
export class AppModule {}
