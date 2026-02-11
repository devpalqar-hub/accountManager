import { IsString, IsDateString, IsBoolean, IsOptional, IsEnum } from 'class-validator';

export enum LeaveType {
  FULL_DAY = 'FULL_DAY',
  HALF_DAY = 'HALF_DAY',
}

export class CreateLeaveDto {
  @IsString()
  employeeId: string;

  @IsDateString()
  leaveDate: string;

  @IsEnum(LeaveType)
  leaveType: LeaveType;

  @IsString()
  reason: string;

  @IsOptional()
  @IsBoolean()
  isCompensatory?: boolean;

  @IsOptional()
  @IsString()
  compensatoryReason?: string;
}

export class UpdateLeaveDto {
  @IsOptional()
  @IsDateString()
  leaveDate?: string;

  @IsOptional()
  @IsEnum(LeaveType)
  leaveType?: LeaveType;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsBoolean()
  isCompensatory?: boolean;

  @IsOptional()
  @IsString()
  compensatoryReason?: string;
}

export class CreateCompensatoryLeaveDto {
  @IsString()
  employeeId: string;

  @IsString()
  reason: string;

  @IsDateString()
  expiryDate: string;
}
