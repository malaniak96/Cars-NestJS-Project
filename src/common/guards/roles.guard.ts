import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles';
import { ERole } from '../enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.roles) {
      // User or roles not found in the request, deny access
      throw new UnauthorizedException('Invalid user or roles');
    }
    const hasRole = roles.some((role) => user.roles.includes(role));
    if (!hasRole) {
      // User does not have the required role, deny access
      throw new UnauthorizedException('Access denied');
    }

    return true;
  }
}
