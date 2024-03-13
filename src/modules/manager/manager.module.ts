import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from './services/manager.service';
import { UserService } from '../user/services/user.service';
import { CarRepository } from '../repositories/services/car.repository';
import { UserRepository } from '../repositories/services/user.repository';

@Module({
  controllers: [ManagerController],
  providers: [ManagerService, CarRepository, UserRepository, UserService],
  exports: [ManagerService],
})
export class ManagerModule {}
