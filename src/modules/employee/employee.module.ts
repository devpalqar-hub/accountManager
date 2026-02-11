import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { PrismaService } from '../../config/database.config';
import { TransactionLogModule } from '../transaction-log/transaction-log.module';

@Module({
  imports: [TransactionLogModule],
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
