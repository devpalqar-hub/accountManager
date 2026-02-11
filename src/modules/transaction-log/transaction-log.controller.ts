import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { TransactionLogService } from './transaction-log.service';
import { CreateTransactionLogDto, FilterTransactionLogsDto } from './dto/transaction-log.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Transaction Logs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transaction-logs')
export class TransactionLogController {
  constructor(private readonly transactionLogService: TransactionLogService) {}

  @Post()
  @ApiOperation({ summary: 'Create transaction log' })
  create(@Body() createTransactionLogDto: CreateTransactionLogDto) {
    return this.transactionLogService.create(createTransactionLogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transaction logs with filters' })
  findAll(@Query() filters: FilterTransactionLogsDto) {
    return this.transactionLogService.findAll(filters);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get transaction statistics' })
  getStats() {
    return this.transactionLogService.getStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction log by ID' })
  findOne(@Param('id') id: string) {
    return this.transactionLogService.findOne(id);
  }
}
