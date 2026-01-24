import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsUUID,
  IsDateString,
} from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 25000.0 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: 'account-uuid-here' })
  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @ApiProperty({ example: 'project-uuid-here' })
  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  @ApiPropertyOptional({ example: '2026-01-24T10:30:00.000Z' })
  @IsDateString()
  @IsOptional()
  paymentDate?: string;

  @ApiPropertyOptional({
    example: 'Payment for Phase 1 development - Invoice #123',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'TXN123456789' })
  @IsString()
  @IsOptional()
  transactionRef?: string;
}

export class UpdatePaymentDto {
  @ApiPropertyOptional({ example: 25000.0 })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiPropertyOptional({ example: 'account-uuid-here' })
  @IsUUID()
  @IsOptional()
  accountId?: string;

  @ApiPropertyOptional({ example: '2026-01-24T10:30:00.000Z' })
  @IsDateString()
  @IsOptional()
  paymentDate?: string;

  @ApiPropertyOptional({
    example: 'Payment for Phase 1 development - Invoice #123',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'TXN123456789' })
  @IsString()
  @IsOptional()
  transactionRef?: string;
}
