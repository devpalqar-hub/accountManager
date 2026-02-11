import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ example: 'Office Supplies' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Purchased office supplies and stationery' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 5000.0 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: 'cf065346-c47a-4c3a-83ec-404806edd481' })
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @ApiPropertyOptional({ example: '7520a5b3-bdf3-4d1f-a8f2-86c636fe59cb' })
  @IsString()
  @IsOptional()
  projectId?: string;

  @ApiPropertyOptional({ example: '2026-02-11T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  expenseDate?: string;

  @ApiPropertyOptional({ example: 'INV-2026-001' })
  @IsString()
  @IsOptional()
  reference?: string;
}

export class UpdateExpenseDto {
  @ApiPropertyOptional({ example: 'Office Supplies' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Purchased office supplies and stationery' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 5000.0 })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiPropertyOptional({ example: 'cf065346-c47a-4c3a-83ec-404806edd481' })
  @IsString()
  @IsOptional()
  accountId?: string;

  @ApiPropertyOptional({ example: '7520a5b3-bdf3-4d1f-a8f2-86c636fe59cb' })
  @IsString()
  @IsOptional()
  projectId?: string;

  @ApiPropertyOptional({ example: '2026-02-11T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  expenseDate?: string;

  @ApiPropertyOptional({ example: 'INV-2026-001' })
  @IsString()
  @IsOptional()
  reference?: string;
}
