import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenType } from '../../modules/auth/enums/token.enum';
import { UserRepository } from '../../modules/repositories/services/user.repository';
import { TokenService } from '../../modules/auth/services/token.service';
import { AuthCacheService } from '../../modules/auth/services/auth-cache.service';
import { EAccountTypes } from '../../modules/user/enums/account-types.enum';
import { typeAccount_KEY } from '../decorators/account-type-premium';

@Injectable()
export class AccountTypeGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userRepository: UserRepository,
    private tokenService: TokenService,
    private authCacheService: AuthCacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const types = this.reflector.getAllAndOverride<EAccountTypes[]>(
      typeAccount_KEY,
      [context.getHandler(), context.getClass()],
    );
    Logger.log(types, 'types');
    if (!types) return true;
    Logger.log(types, 'types');

    const request = context.switchToHttp().getRequest();

    const accessToken = request.get('Authorization')?.split('Bearer ')[1];

    Logger.log(accessToken, 'accessToken');

    if (!accessToken) {
      throw new UnauthorizedException();
    }
    const payload = await this.tokenService.verifyToken(
      accessToken,
      TokenType.ACCESS,
    );

    Logger.log(payload, 'payload');
    if (!payload) {
      throw new UnauthorizedException();
    }

    const findTokenInRedis = await this.authCacheService.isAccessTokenExist(
      payload.userId,
      payload.deviceId,
      accessToken,
    );
    if (!findTokenInRedis) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({
      id: payload.userId,
    });
    Logger.log(payload.userId, 'user');
    if (!user) {
      throw new UnauthorizedException();
    }

    return types.some((type) => user.typeAccount?.includes(type));
  }
}
