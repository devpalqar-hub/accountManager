import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { PrismaService } from '../../config/database.config';
import { TransactionLogModule } from '../transaction-log/transaction-log.module';

@Module({
  imports: [TransactionLogModule],
  controllers: [ExpenseController],
  providers: [ExpenseService, PrismaService],
  exports: [ExpenseService],
})
export class ExpenseModule {}
