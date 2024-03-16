import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from './services/manager.service';
import { UserService } from '../user/services/user.service';
import { CarRepository } from '../repositories/services/car.repository';
import { UserRepository } from '../repositories/services/user.repository';
import { TokenService } from '../auth/services/token.service';
import { AuthCacheService } from '../auth/services/auth-cache.service';
import { RedisService } from '../redis/redis.service';
import { redisProvider } from '../redis/redis.module';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/services/auth.service';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [ManagerController],
  providers: [
    ManagerService,
    CarRepository,
    UserRepository,
    UserService,
    TokenService,
    JwtService,
    AuthCacheService,
    RedisService,
    redisProvider,
  ],
  exports: [ManagerService],
})
export class ManagerModule {}
