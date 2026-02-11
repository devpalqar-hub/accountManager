import { IsString, IsNumber, IsOptional, IsEnum, IsDateString } from 'class-validator';

export enum TransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export class CreateTransactionLogDto {
  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @IsNumber()
  amount: number;

  @IsString()
  accountId: string;

  @IsString()
  accountName: string;

  @IsString()
  performedBy: string;

  @IsString()
  performedByEmail: string;

  @IsString()
  action: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  referenceId?: string;

  @IsOptional()
  @IsString()
  referenceType?: string;

  @IsOptional()
  @IsString()
  projectId?: string;

  @IsOptional()
  @IsString()
  projectTitle?: string;
}

export class FilterTransactionLogsDto {
  @IsOptional()
  @IsEnum(TransactionType)
  transactionType?: TransactionType;

  @IsOptional()
  @IsString()
  accountId?: string;

  @IsOptional()
  @IsString()
  performedBy?: string;

  @IsOptional()
  @IsString()
  action?: string;

  @IsOptional()
  @IsString()
  projectId?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
}
