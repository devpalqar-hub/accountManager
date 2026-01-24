import { Module } from '@nestjs/common';
import { WorkPackageService } from './work-package.service';
import { WorkPackageController } from './work-package.controller';
import { PrismaService } from '../../config/database.config';

@Module({
  controllers: [WorkPackageController],
  providers: [WorkPackageService, PrismaService],
  exports: [WorkPackageService],
})
export class WorkPackageModule {}
