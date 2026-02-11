"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const database_config_1 = require("../../config/database.config");
const library_1 = require("@prisma/client/runtime/library");
let EmployeeService = class EmployeeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createEmployeeDto) {
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
    async findOne(id) {
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
            throw new common_1.NotFoundException(`Employee with ID ${id} not found`);
        }
        return employee;
    }
    async update(id, updateEmployeeDto) {
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
    async remove(id) {
        await this.findOne(id);
        return this.prisma.employee.delete({ where: { id } });
    }
    async createLeave(createLeaveDto) {
        const employee = await this.findOne(createLeaveDto.employeeId);
        const leaveDate = new Date(createLeaveDto.leaveDate);
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
            throw new common_1.BadRequestException('Leave already marked for this date');
        }
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
                throw new common_1.BadRequestException('No available compensatory leaves');
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
    async findLeavesByEmployee(employeeId, month, year) {
        const where = { employeeId };
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
    async updateLeave(id, updateLeaveDto) {
        const leave = await this.prisma.leave.findUnique({ where: { id } });
        if (!leave) {
            throw new common_1.NotFoundException(`Leave with ID ${id} not found`);
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
    async removeLeave(id) {
        const leave = await this.prisma.leave.findUnique({ where: { id } });
        if (!leave) {
            throw new common_1.NotFoundException(`Leave with ID ${id} not found`);
        }
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
    async createCompensatoryLeave(createCompLeaveDto) {
        await this.findOne(createCompLeaveDto.employeeId);
        return this.prisma.compensatoryLeave.create({
            data: {
                ...createCompLeaveDto,
                expiryDate: new Date(createCompLeaveDto.expiryDate),
            },
        });
    }
    async findCompensatoryLeaves(employeeId) {
        return this.prisma.compensatoryLeave.findMany({
            where: { employeeId },
            orderBy: { grantedDate: 'desc' },
        });
    }
    async removeCompensatoryLeave(id) {
        const compLeave = await this.prisma.compensatoryLeave.findUnique({
            where: { id },
        });
        if (!compLeave) {
            throw new common_1.NotFoundException(`Compensatory leave with ID ${id} not found`);
        }
        if (compLeave.isUsed) {
            throw new common_1.BadRequestException('Cannot delete used compensatory leave');
        }
        return this.prisma.compensatoryLeave.delete({ where: { id } });
    }
    async calculateSalary(calculateSalaryDto) {
        const { employeeId, month, year } = calculateSalaryDto;
        const employee = await this.findOne(employeeId);
        const leaves = await this.findLeavesByEmployee(employeeId, month, year);
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
        let fullDayLeaves = 0;
        let halfDayLeaves = 0;
        let compensatoryLeavesUsed = 0;
        leaves.forEach((leave) => {
            if (leave.isCompensatory) {
                if (leave.leaveType === 'FULL_DAY') {
                    compensatoryLeavesUsed += 1;
                }
                else {
                    compensatoryLeavesUsed += 0.5;
                }
            }
            else {
                if (leave.leaveType === 'FULL_DAY') {
                    fullDayLeaves += 1;
                }
                else {
                    halfDayLeaves += 1;
                }
            }
        });
        const totalLeaveDays = fullDayLeaves + halfDayLeaves * 0.5;
        const paidLeaves = Math.min(totalLeaveDays, employee.paidLeavesPerMonth);
        const unpaidLeaves = Math.max(0, totalLeaveDays - employee.paidLeavesPerMonth);
        const presentDays = totalWorkingDays -
            fullDayLeaves -
            halfDayLeaves * 0.5 +
            paidLeaves -
            compensatoryLeavesUsed;
        const totalSalary = (presentDays + compensatoryLeavesUsed) * Number(employee.dailySalary);
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
    async processSalary(processSalaryDto) {
        const { employeeId, month, year, deductions = 0, notes } = processSalaryDto;
        const existingRecord = await this.prisma.salaryRecord.findUnique({
            where: {
                employeeId_month_year: { employeeId, month, year },
            },
        });
        if (existingRecord && existingRecord.isProcessed) {
            throw new common_1.BadRequestException(`Salary for ${month}/${year} is already processed`);
        }
        const calculation = await this.calculateSalary({ employeeId, month, year });
        const netSalary = calculation.totalSalary - deductions;
        const primaryAccount = await this.prisma.account.findFirst({
            where: { isPrimary: true, isActive: true },
        });
        if (!primaryAccount) {
            throw new common_1.BadRequestException('No primary account found. Please set a primary account first.');
        }
        const currentBalance = Number(primaryAccount.currentBalance);
        if (currentBalance < netSalary) {
            throw new common_1.BadRequestException(`Insufficient balance in primary account. Available: ₹${currentBalance}, Required: ₹${netSalary}`);
        }
        const newBalance = new library_1.Decimal(currentBalance).minus(new library_1.Decimal(netSalary));
        await this.prisma.account.update({
            where: { id: primaryAccount.id },
            data: { currentBalance: newBalance },
        });
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
    async findSalaryRecords(employeeId, year) {
        const where = {};
        if (employeeId)
            where.employeeId = employeeId;
        if (year)
            where.year = year;
        return this.prisma.salaryRecord.findMany({
            where,
            orderBy: [{ year: 'desc' }, { month: 'desc' }],
            include: {
                employee: true,
            },
        });
    }
    async findSalaryRecord(id) {
        const record = await this.prisma.salaryRecord.findUnique({
            where: { id },
            include: {
                employee: true,
            },
        });
        if (!record) {
            throw new common_1.NotFoundException(`Salary record with ID ${id} not found`);
        }
        return record;
    }
    async updateSalaryRecord(id, updateDto) {
        await this.findSalaryRecord(id);
        return this.prisma.salaryRecord.update({
            where: { id },
            data: updateDto,
        });
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_config_1.PrismaService])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map