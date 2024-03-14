import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles';
import { ERole } from '../../common/enums/role.enum';
import { EAccountTypes } from '../user/enums/account-types.enum';
import { typeAccountPremium } from '../../common/decorators/account-type-premium';
import { AccountTypeGuard } from '../../common/guards/account-type.guard';

@ApiBearerAuth()
@Roles(ERole.MANAGER, ERole.ADMIN)
@ApiTags('Advertisement')
@Controller('advertisements')
export class AdvertisementController {
  constructor() {}

  @ApiBearerAuth()
  @Roles(ERole.SELLER)
  @typeAccountPremium(EAccountTypes.PREMIUM)
  @UseGuards(RoleGuard, AccountTypeGuard)
  @ApiOperation({
    summary: 'Get number of views of a chosen advertisement',
  })
  @Get()
  private async getViewsOfAdvertisement() {}

  @ApiBearerAuth()
  @Roles(ERole.SELLER)
  @typeAccountPremium(EAccountTypes.PREMIUM)
  @UseGuards(RoleGuard, AccountTypeGuard)
  @ApiOperation({
    summary: 'Get an average price of a car for a chosen region',
  })
  @Get()
  private async getAveragePriceForCarByRegion() {}

  @ApiBearerAuth()
  @Roles(ERole.SELLER)
  @typeAccountPremium(EAccountTypes.PREMIUM)
  @UseGuards(RoleGuard, AccountTypeGuard)
  @ApiOperation({
    summary: 'Get an average price of a car in Ukraine',
  })
  @Get('average-price')
  private async getAveragePriceForCarForUkraine() {}
}
