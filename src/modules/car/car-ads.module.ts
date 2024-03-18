import { Module } from '@nestjs/common';
import { CarAdsController } from './car-ads.controller';
import { CarAdsService } from './services/car-ads.service';
import { HttpModule } from '@nestjs/axios';
import { CarCurrencyService } from './services/car-currency.service';
import { UserService } from '../user/services/user.service';
import { AuthCacheService } from '../auth/services/auth-cache.service';
import { TokenService } from '../auth/services/token.service';
import { redisProvider } from '../redis/redis.module';
import { RedisService } from '../redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import { CarAdsViewsService } from './services/car-ads-views.service';

@Module({
  imports: [HttpModule],
  controllers: [CarAdsController],
  providers: [
    CarCurrencyService,
    CarAdsService,
    UserService,
    CarAdsViewsService,
    TokenService,
    JwtService,
    AuthCacheService,
    RedisService,
    redisProvider,
  ],
  exports: [CarAdsService, CarCurrencyService],
})
export class CarAdsModule {}
