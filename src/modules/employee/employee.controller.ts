import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto';
import { CreateLeaveDto, UpdateLeaveDto, CreateCompensatoryLeaveDto } from './dto/leave.dto';
import { CalculateSalaryDto, ProcessSalaryDto, UpdateSalaryRecordDto } from './dto/salary.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('employees')
@UseGuards(JwtAuthGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // ==================== EMPLOYEE ENDPOINTS ====================
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }

  // ==================== LEAVE ENDPOINTS ====================
  @Post('leaves')
  createLeave(@Body() createLeaveDto: CreateLeaveDto) {
    return this.employeeService.createLeave(createLeaveDto);
  }

  @Get(':employeeId/leaves')
  findLeaves(
    @Param('employeeId') employeeId: string,
    @Query('month') month?: string,
    @Query('year') year?: string,
  ) {
    return this.employeeService.findLeavesByEmployee(
      employeeId,
      month ? parseInt(month) : undefined,
      year ? parseInt(year) : undefined,
    );
  }

  @Patch('leaves/:id')
  updateLeave(@Param('id') id: string, @Body() updateLeaveDto: UpdateLeaveDto) {
    return this.employeeService.updateLeave(id, updateLeaveDto);
  }

  @Delete('leaves/:id')
  removeLeave(@Param('id') id: string) {
    return this.employeeService.removeLeave(id);
  }

  // ==================== COMPENSATORY LEAVE ENDPOINTS ====================
  @Post('compensatory-leaves')
  createCompensatoryLeave(@Body() createCompLeaveDto: CreateCompensatoryLeaveDto) {
    return this.employeeService.createCompensatoryLeave(createCompLeaveDto);
  }

  @Get(':employeeId/compensatory-leaves')
  findCompensatoryLeaves(@Param('employeeId') employeeId: string) {
    return this.employeeService.findCompensatoryLeaves(employeeId);
  }

  @Delete('compensatory-leaves/:id')
  removeCompensatoryLeave(@Param('id') id: string) {
    return this.employeeService.removeCompensatoryLeave(id);
  }

  // ==================== SALARY ENDPOINTS ====================
  @Post('salary/calculate')
  calculateSalary(@Body() calculateSalaryDto: CalculateSalaryDto) {
    return this.employeeService.calculateSalary(calculateSalaryDto);
  }

  @Post('salary/process')
  processSalary(@Body() processSalaryDto: ProcessSalaryDto) {
    return this.employeeService.processSalary(processSalaryDto);
  }

  @Get('salary/records')
  findSalaryRecords(
    @Query('employeeId') employeeId?: string,
    @Query('year') year?: string,
  ) {
    return this.employeeService.findSalaryRecords(
      employeeId,
      year ? parseInt(year) : undefined,
    );
  }

  @Get('salary/records/:id')
  findSalaryRecord(@Param('id') id: string) {
    return this.employeeService.findSalaryRecord(id);
  }

  @Patch('salary/records/:id')
  updateSalaryRecord(
    @Param('id') id: string,
    @Body() updateDto: UpdateSalaryRecordDto,
  ) {
    return this.employeeService.updateSalaryRecord(id, updateDto);
  }
}
