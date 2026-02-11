import { IsString, IsEmail, IsOptional, IsNumber, IsBoolean, IsDateString, Min } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsOptional()
  @IsDateString()
  joiningDate?: string;

  @IsNumber()
  @Min(0)
  dailySalary: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  paidLeavesPerMonth?: number;

  @IsOptional()
  @IsString()
  workingDays?: string; // e.g., "1,2,3,4,5,6" for Mon-Sat
}

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsOptional()
  @IsDateString()
  joiningDate?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  dailySalary?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  paidLeavesPerMonth?: number;

  @IsOptional()
  @IsString()
  workingDays?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
