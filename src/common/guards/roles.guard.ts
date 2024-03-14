import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles';
import { ERole } from '../enums/role.enum';
import { TokenType } from '../../modules/auth/enums/token.enum';
import { UserRepository } from '../../modules/repositories/services/user.repository';
import { TokenService } from '../../modules/auth/services/token.service';
import { AuthCacheService } from '../../modules/auth/services/auth-cache.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userRepository: UserRepository,
    private tokenService: TokenService,
    private authCacheService: AuthCacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    Logger.log(roles, 'roles');
    if (!roles) return true;
    Logger.log(roles, 'roles');

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

    return roles.some((role) => user.role?.includes(role));
  }
}
