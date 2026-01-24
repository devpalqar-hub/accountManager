import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsNumber,
  IsEnum,
  IsUUID,
} from 'class-validator';

export enum WorkPackageStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
}

export class CreateWorkPackageDto {
  @ApiProperty({ example: 'Phase 1 - Foundation Development' })
  @IsString()
  @IsNotEmpty()
  workPackageName: string;

  @ApiProperty({ example: 25000.0 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: 'project-uuid-here' })
  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  @ApiPropertyOptional({ example: '1.0' })
  @IsString()
  @IsOptional()
  version?: string;

  @ApiPropertyOptional({ example: '2026-02-01T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ example: '2026-03-31T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  completionDate?: string;

  @ApiPropertyOptional({ example: 10000.0 })
  @IsNumber()
  @IsOptional()
  advanceAmount?: number;

  @ApiPropertyOptional({ example: 2000.0 })
  @IsNumber()
  @IsOptional()
  miscellaneousAmount?: number;

  @ApiPropertyOptional({ example: 5000.0 })
  @IsNumber()
  @IsOptional()
  ongoingCost?: number;

  @ApiPropertyOptional({ enum: WorkPackageStatus, example: 'PENDING' })
  @IsEnum(WorkPackageStatus)
  @IsOptional()
  status?: WorkPackageStatus;

  @ApiPropertyOptional({
    example: 'Initial development phase including backend setup',
  })
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateWorkPackageDto {
  @ApiPropertyOptional({ example: 'Phase 1 - Foundation Development' })
  @IsString()
  @IsOptional()
  workPackageName?: string;

  @ApiPropertyOptional({ example: 25000.0 })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiPropertyOptional({ example: '1.0' })
  @IsString()
  @IsOptional()
  version?: string;

  @ApiPropertyOptional({ example: '2026-02-01T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ example: '2026-03-31T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  completionDate?: string;

  @ApiPropertyOptional({ example: 10000.0 })
  @IsNumber()
  @IsOptional()
  advanceAmount?: number;

  @ApiPropertyOptional({ example: 2000.0 })
  @IsNumber()
  @IsOptional()
  miscellaneousAmount?: number;

  @ApiPropertyOptional({ example: 5000.0 })
  @IsNumber()
  @IsOptional()
  ongoingCost?: number;

  @ApiPropertyOptional({ enum: WorkPackageStatus, example: 'IN_PROGRESS' })
  @IsEnum(WorkPackageStatus)
  @IsOptional()
  status?: WorkPackageStatus;

  @ApiPropertyOptional({
    example: 'Initial development phase including backend setup',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
