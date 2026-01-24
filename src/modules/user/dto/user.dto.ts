import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'admin@palqar.com' })
  @IsEmail()
  email: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'admin@palqar.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
