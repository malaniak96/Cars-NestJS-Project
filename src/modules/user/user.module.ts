import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { AuthCacheService } from '../auth/services/auth-cache.service';
import { TokenService } from '../auth/services/token.service';
import { redisProvider } from '../redis/redis.module';
import { RedisService } from '../redis/redis.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    AuthCacheService,
    TokenService,
    redisProvider,
    RedisService,
    JwtService,
  ],
  exports: [UserService],
})
export class UserModule {}
