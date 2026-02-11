import { Module } from '@nestjs/common';
import { TransactionLogService } from './transaction-log.service';
import { TransactionLogController } from './transaction-log.controller';
import { PrismaService } from '../../config/database.config';

@Module({
  controllers: [TransactionLogController],
  providers: [TransactionLogService, PrismaService],
  exports: [TransactionLogService],
})
export class TransactionLogModule {}
