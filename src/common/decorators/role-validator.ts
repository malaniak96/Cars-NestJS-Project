import { IsIn, ValidationOptions } from 'class-validator';
import { ERole } from '../enums/role.enum';

export function IsPermittedRole(validationOptions?: ValidationOptions) {
  return IsIn([ERole.BUYER, ERole.SELLER, ERole.DEALER], validationOptions);
}

export function IsPermittedRoleAdmin(validationOptions?: ValidationOptions) {
  return IsIn([ERole.MANAGER, ERole.ADMIN], validationOptions);
}
