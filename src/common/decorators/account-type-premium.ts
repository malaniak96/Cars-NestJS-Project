import { SetMetadata } from '@nestjs/common';
import { EAccountTypes } from '../../modules/user/enums/account-types.enum';

export const typeAccount_KEY = 'typeAccount';
export const typeAccountPremium = (...typeAccount: EAccountTypes[]) =>
  SetMetadata(typeAccount_KEY, typeAccount);
