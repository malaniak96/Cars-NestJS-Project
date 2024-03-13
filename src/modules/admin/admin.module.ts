import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AdminService } from './services/admin.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
