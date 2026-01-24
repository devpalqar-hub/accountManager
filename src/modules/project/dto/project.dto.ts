import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'E-commerce Platform Development' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    example: 'ABC Corporation, Contact: John Doe, Email: john@abc.com',
  })
  @IsString()
  @IsOptional()
  clientDetails?: string;

  @ApiPropertyOptional({ example: '2026-01-01T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ example: '2026-12-31T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({
    example: 'Full-stack e-commerce platform with payment integration',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'ACTIVE' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ example: 50000.0 })
  @IsNumber()
  @IsOptional()
  budget?: number;
}

export class UpdateProjectDto {
  @ApiPropertyOptional({ example: 'E-commerce Platform Development' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    example: 'ABC Corporation, Contact: John Doe, Email: john@abc.com',
  })
  @IsString()
  @IsOptional()
  clientDetails?: string;

  @ApiPropertyOptional({ example: '2026-01-01T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ example: '2026-12-31T00:00:00.000Z' })
  @IsDateString()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({
    example: 'Full-stack e-commerce platform with payment integration',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'COMPLETED' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ example: 75000.0 })
  @IsNumber()
  @IsOptional()
  budget?: number;
}
