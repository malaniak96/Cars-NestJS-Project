import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { EAccountTypes } from '../../modules/user/enums/account-types.enum';
import { UserService } from '../../modules/user/services/user.service';

@Injectable()
export class PremiumAccountGuard implements CanActivate {
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;

    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.typeAccount !== EAccountTypes.PREMIUM) {
      throw new BadRequestException(
        'Only users with a premium account can access this resource',
      );
    }

    return true;
  }
}
