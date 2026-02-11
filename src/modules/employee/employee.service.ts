import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../config/database.config';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/employee.dto';
import { CreateLeaveDto, UpdateLeaveDto, CreateCompensatoryLeaveDto } from './dto/leave.dto';
import { CalculateSalaryDto, ProcessSalaryDto, UpdateSalaryRecordDto } from './dto/salary.dto';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  // ==================== EMPLOYEE CRUD ====================
  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: {
        ...createEmployeeDto,
        dailySalary: Number(createEmployeeDto.dailySalary),
        joiningDate: createEmployeeDto.joiningDate
          ? new Date(createEmployeeDto.joiningDate)
          : new Date(),
      },
    });
  }

  async findAll() {
    return this.prisma.employee.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            leaves: true,
            compensatoryLeaves: { where: { isUsed: false } },
            salaryRecords: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        leaves: {
          orderBy: { leaveDate: 'desc' },
          take: 50,
        },
        compensatoryLeaves: {
          orderBy: { grantedDate: 'desc' },
        },
        salaryRecords: {
          orderBy: [{ year: 'desc' }, { month: 'desc' }],
        },
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    await this.findOne(id);

    return this.prisma.employee.update({
      where: { id },
      data: {
        ...updateEmployeeDto,
        dailySalary: updateEmployeeDto.dailySalary
          ? Number(updateEmployeeDto.dailySalary)
          : undefined,
        joiningDate: updateEmployeeDto.joiningDate
          ? new Date(updateEmployeeDto.joiningDate)
          : undefined,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.employee.delete({ where: { id } });
  }

  // ==================== LEAVE MANAGEMENT ====================
  async createLeave(createLeaveDto: CreateLeaveDto) {
    const employee = await this.findOne(createLeaveDto.employeeId);
    const leaveDate = new Date(createLeaveDto.leaveDate);

    // Check if leave already exists for this date
    const existingLeave = await this.prisma.leave.findFirst({
      where: {
        employeeId: createLeaveDto.employeeId,
        leaveDate: {
          gte: new Date(leaveDate.setHours(0, 0, 0, 0)),
          lt: new Date(leaveDate.setHours(23, 59, 59, 999)),
        },
      },
    });

    if (existingLeave) {
      throw new BadRequestException('Leave already marked for this date');
    }

    // If compensatory leave, mark one as used
    if (createLeaveDto.isCompensatory) {
      const availableCompLeave = await this.prisma.compensatoryLeave.findFirst({
        where: {
          employeeId: createLeaveDto.employeeId,
          isUsed: false,
          expiryDate: { gte: new Date() },
        },
        orderBy: { expiryDate: 'asc' },
      });

      if (!availableCompLeave) {
        throw new BadRequestException('No available compensatory leaves');
      }

      await this.prisma.compensatoryLeave.update({
        where: { id: availableCompLeave.id },
        data: { isUsed: true, usedDate: new Date() },
      });
    }

    return this.prisma.leave.create({
      data: {
        ...createLeaveDto,
        leaveDate: new Date(createLeaveDto.leaveDate),
      },
    });
  }

  async findLeavesByEmployee(employeeId: string, month?: number, year?: number) {
    const where: any = { employeeId };

    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      where.leaveDate = {
        gte: startDate,
        lte: endDate,
      };
    }

    return this.prisma.leave.findMany({
      where,
      orderBy: { leaveDate: 'desc' },
    });
  }

  async updateLeave(id: string, updateLeaveDto: UpdateLeaveDto) {
    const leave = await this.prisma.leave.findUnique({ where: { id } });
    if (!leave) {
      throw new NotFoundException(`Leave with ID ${id} not found`);
    }

    return this.prisma.leave.update({
      where: { id },
      data: {
        ...updateLeaveDto,
        leaveDate: updateLeaveDto.leaveDate
          ? new Date(updateLeaveDto.leaveDate)
          : undefined,
      },
    });
  }

  async removeLeave(id: string) {
    const leave = await this.prisma.leave.findUnique({ where: { id } });
    if (!leave) {
      throw new NotFoundException(`Leave with ID ${id} not found`);
    }

    // If it was a compensatory leave, mark it as unused again
    if (leave.isCompensatory) {
      const usedCompLeave = await this.prisma.compensatoryLeave.findFirst({
        where: {
          employeeId: leave.employeeId,
          isUsed: true,
          usedDate: { lte: leave.createdAt },
        },
        orderBy: { usedDate: 'desc' },
      });

      if (usedCompLeave) {
        await this.prisma.compensatoryLeave.update({
          where: { id: usedCompLeave.id },
          data: { isUsed: false, usedDate: null },
        });
      }
    }

    return this.prisma.leave.delete({ where: { id } });
  }

  // ==================== COMPENSATORY LEAVE ====================
  async createCompensatoryLeave(createCompLeaveDto: CreateCompensatoryLeaveDto) {
    await this.findOne(createCompLeaveDto.employeeId);

    return this.prisma.compensatoryLeave.create({
      data: {
        ...createCompLeaveDto,
        expiryDate: new Date(createCompLeaveDto.expiryDate),
      },
    });
  }

  async findCompensatoryLeaves(employeeId: string) {
    return this.prisma.compensatoryLeave.findMany({
      where: { employeeId },
      orderBy: { grantedDate: 'desc' },
    });
  }

  async removeCompensatoryLeave(id: string) {
    const compLeave = await this.prisma.compensatoryLeave.findUnique({
      where: { id },
    });

    if (!compLeave) {
      throw new NotFoundException(`Compensatory leave with ID ${id} not found`);
    }

    if (compLeave.isUsed) {
      throw new BadRequestException('Cannot delete used compensatory leave');
    }

    return this.prisma.compensatoryLeave.delete({ where: { id } });
  }

  // ==================== SALARY CALCULATION ====================
  async calculateSalary(calculateSalaryDto: CalculateSalaryDto) {
    const { employeeId, month, year } = calculateSalaryDto;
    const employee = await this.findOne(employeeId);

    // Get all leaves for the month
    const leaves = await this.findLeavesByEmployee(employeeId, month, year);

    // Calculate working days in month
    const workingDaysArray = employee.workingDays.split(',').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    let totalWorkingDays = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const dayOfWeek = date.getDay();
      if (workingDaysArray.includes(dayOfWeek)) {
        totalWorkingDays++;
      }
    }

    // Count leave types
    let fullDayLeaves = 0;
    let halfDayLeaves = 0;
    let compensatoryLeavesUsed = 0;

    leaves.forEach((leave) => {
      if (leave.isCompensatory) {
        if (leave.leaveType === 'FULL_DAY') {
          compensatoryLeavesUsed += 1;
        } else {
          compensatoryLeavesUsed += 0.5;
        }
      } else {
        if (leave.leaveType === 'FULL_DAY') {
          fullDayLeaves += 1;
        } else {
          halfDayLeaves += 1;
        }
      }
    });

    // Calculate paid and unpaid leaves
    const totalLeaveDays = fullDayLeaves + halfDayLeaves * 0.5;
    const paidLeaves = Math.min(totalLeaveDays, employee.paidLeavesPerMonth);
    const unpaidLeaves = Math.max(0, totalLeaveDays - employee.paidLeavesPerMonth);

    // Calculate present days
    const presentDays =
      totalWorkingDays -
      fullDayLeaves -
      halfDayLeaves * 0.5 +
      paidLeaves -
      compensatoryLeavesUsed;

    // Calculate salary
    const totalSalary =
      (presentDays + compensatoryLeavesUsed) * Number(employee.dailySalary);

    return {
      employeeId,
      month,
      year,
      workingDays: totalWorkingDays,
      presentDays: Math.round(presentDays),
      halfDays: halfDayLeaves,
      paidLeaves: Math.round(paidLeaves),
      unpaidLeaves: Math.round(unpaidLeaves),
      compensatoryLeaves: Math.round(compensatoryLeavesUsed),
      dailySalary: employee.dailySalary,
      totalSalary,
      deductions: 0,
      netSalary: totalSalary,
    };
  }

  async processSalary(processSalaryDto: ProcessSalaryDto) {
    const { employeeId, month, year, deductions = 0, notes } = processSalaryDto;

    // Check if already processed
    const existingRecord = await this.prisma.salaryRecord.findUnique({
      where: {
        employeeId_month_year: { employeeId, month, year },
      },
    });

    if (existingRecord && existingRecord.isProcessed) {
      throw new BadRequestException(
        `Salary for ${month}/${year} is already processed`,
      );
    }

    // Calculate salary
    const calculation = await this.calculateSalary({ employeeId, month, year });
    const netSalary = calculation.totalSalary - deductions;

    // Find primary account
    const primaryAccount = await this.prisma.account.findFirst({
      where: { isPrimary: true, isActive: true },
    });

    if (!primaryAccount) {
      throw new BadRequestException(
        'No primary account found. Please set a primary account first.',
      );
    }

    // Check if primary account has sufficient balance
    const currentBalance = Number(primaryAccount.currentBalance);
    if (currentBalance < netSalary) {
      throw new BadRequestException(
        `Insufficient balance in primary account. Available: ₹${currentBalance}, Required: ₹${netSalary}`,
      );
    }

    // Deduct salary from primary account
    const newBalance = new Decimal(currentBalance).minus(new Decimal(netSalary));
    await this.prisma.account.update({
      where: { id: primaryAccount.id },
      data: { currentBalance: newBalance },
    });

    // Create or update salary record
    return this.prisma.salaryRecord.upsert({
      where: {
        employeeId_month_year: { employeeId, month, year },
      },
      create: {
        employeeId,
        month,
        year,
        workingDays: calculation.workingDays,
        presentDays: calculation.presentDays,
        halfDays: calculation.halfDays,
        paidLeaves: calculation.paidLeaves,
        unpaidLeaves: calculation.unpaidLeaves,
        compensatoryLeaves: calculation.compensatoryLeaves,
        totalSalary: calculation.totalSalary,
        deductions,
        netSalary,
        isProcessed: true,
        processedDate: new Date(),
        notes,
      },
      update: {
        workingDays: calculation.workingDays,
        presentDays: calculation.presentDays,
        halfDays: calculation.halfDays,
        paidLeaves: calculation.paidLeaves,
        unpaidLeaves: calculation.unpaidLeaves,
        compensatoryLeaves: calculation.compensatoryLeaves,
        totalSalary: calculation.totalSalary,
        deductions,
        netSalary,
        isProcessed: true,
        processedDate: new Date(),
        notes,
      },
      include: {
        employee: true,
      },
    });
  }

  async findSalaryRecords(employeeId?: string, year?: number) {
    const where: any = {};

    if (employeeId) where.employeeId = employeeId;
    if (year) where.year = year;

    return this.prisma.salaryRecord.findMany({
      where,
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
      include: {
        employee: true,
      },
    });
  }

  async findSalaryRecord(id: string) {
    const record = await this.prisma.salaryRecord.findUnique({
      where: { id },
      include: {
        employee: true,
      },
    });

    if (!record) {
      throw new NotFoundException(`Salary record with ID ${id} not found`);
    }

    return record;
  }

  async updateSalaryRecord(id: string, updateDto: UpdateSalaryRecordDto) {
    await this.findSalaryRecord(id);

    return this.prisma.salaryRecord.update({
      where: { id },
      data: updateDto,
    });
  }
}
