import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../../modules/user/services/user.service';
import { CarAdsService } from '../../modules/car/services/car-ads.service';
import { ERole } from '../enums/role.enum';
import { EAccountTypes } from '../../modules/user/enums/account-types.enum';

@Injectable()
export class BasicAccountSellingLimitsGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly carAdsService: CarAdsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.userId;

    const user = await this.userService.getUserById(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (
      user.role !== ERole.SELLER ||
      user.typeAccount !== EAccountTypes.BASIC
    ) {
      return true;
    }

    // Check if the user has already created an advertisement
    const existingAdvertisements =
      await this.carAdsService.getUserAdvertisementCount(user.id);
    if (existingAdvertisements >= 1) {
      throw new BadRequestException(
        'Basic account users can create only one advertisement.',
      );
    }

    return true;
  }
}
