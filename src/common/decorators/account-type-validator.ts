import { IsIn, ValidationOptions } from 'class-validator';
import { EAccountTypes } from '../../modules/user/enums/account-types.enum';
export function IsAccountTypePremium(validationOptions?: ValidationOptions) {
  return IsIn([EAccountTypes.PREMIUM], validationOptions);
}
