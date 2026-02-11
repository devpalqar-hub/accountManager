import { IsString, IsNumber, IsBoolean, IsOptional, Min, Max } from 'class-validator';

export class CalculateSalaryDto {
  @IsString()
  employeeId: string;

  @IsNumber()
  @Min(1)
  @Max(12)
  month: number;

  @IsNumber()
  @Min(2020)
  year: number;
}

export class ProcessSalaryDto {
  @IsString()
  employeeId: string;

  @IsNumber()
  @Min(1)
  @Max(12)
  month: number;

  @IsNumber()
  @Min(2020)
  year: number;

  @IsOptional()
  @IsNumber()
  deductions?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateSalaryRecordDto {
  @IsOptional()
  @IsNumber()
  deductions?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsBoolean()
  isProcessed?: boolean;
}
