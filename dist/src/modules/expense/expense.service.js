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
exports.ExpenseService = void 0;
const common_1 = require("@nestjs/common");
const database_config_1 = require("../../config/database.config");
let ExpenseService = class ExpenseService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createExpenseDto, userId) {
        const { accountId, projectId, ...expenseData } = createExpenseDto;
        if (!userId) {
            throw new common_1.NotFoundException('User ID is required');
        }
        const account = await this.prisma.account.findUnique({
            where: { id: accountId },
        });
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        if (projectId) {
            const project = await this.prisma.project.findUnique({
                where: { id: projectId },
            });
            if (!project) {
                throw new common_1.NotFoundException('Project not found');
            }
        }
        const data = { ...expenseData };
        if (data.expenseDate && !data.expenseDate.includes('T')) {
            data.expenseDate = new Date(data.expenseDate).toISOString();
        }
        const expense = await this.prisma.expense.create({
            data: {
                ...data,
                accountId,
                projectId,
                addedBy: userId,
            },
            include: {
                account: {
                    select: {
                        id: true,
                        accountName: true,
                        accountHolderName: true,
                    },
                },
                project: projectId
                    ? {
                        select: {
                            id: true,
                            title: true,
                            clientDetails: true,
                        },
                    }
                    : undefined,
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        });
        await this.prisma.account.update({
            where: { id: accountId },
            data: {
                currentBalance: {
                    decrement: createExpenseDto.amount,
                },
            },
        });
        return expense;
    }
    async findAll() {
        return this.prisma.expense.findMany({
            include: {
                account: {
                    select: {
                        id: true,
                        accountName: true,
                        accountHolderName: true,
                    },
                },
                project: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                expenseDate: 'desc',
            },
        });
    }
    async findOne(id) {
        const expense = await this.prisma.expense.findUnique({
            where: { id },
            include: {
                account: {
                    select: {
                        id: true,
                        accountName: true,
                        accountHolderName: true,
                        bankName: true,
                        accountNumber: true,
                    },
                },
                project: {
                    select: {
                        id: true,
                        title: true,
                        clientDetails: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        });
        if (!expense) {
            throw new common_1.NotFoundException('Expense not found');
        }
        return expense;
    }
    async findByProject(projectId) {
        return this.prisma.expense.findMany({
            where: { projectId },
            include: {
                account: {
                    select: {
                        id: true,
                        accountName: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                expenseDate: 'desc',
            },
        });
    }
    async findByAccount(accountId) {
        return this.prisma.expense.findMany({
            where: { accountId },
            include: {
                project: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                expenseDate: 'desc',
            },
        });
    }
    async update(id, updateExpenseDto) {
        const existingExpense = await this.findOne(id);
        const oldAmount = Number(existingExpense.amount);
        const newAmount = updateExpenseDto.amount || oldAmount;
        const amountDifference = newAmount - oldAmount;
        if (updateExpenseDto.accountId &&
            updateExpenseDto.accountId !== existingExpense.accountId) {
            const newAccount = await this.prisma.account.findUnique({
                where: { id: updateExpenseDto.accountId },
            });
            if (!newAccount) {
                throw new common_1.NotFoundException('New account not found');
            }
            await this.prisma.account.update({
                where: { id: existingExpense.accountId },
                data: {
                    currentBalance: {
                        increment: oldAmount,
                    },
                },
            });
            await this.prisma.account.update({
                where: { id: updateExpenseDto.accountId },
                data: {
                    currentBalance: {
                        decrement: newAmount,
                    },
                },
            });
        }
        else if (amountDifference !== 0) {
            await this.prisma.account.update({
                where: { id: existingExpense.accountId },
                data: {
                    currentBalance: {
                        decrement: amountDifference,
                    },
                },
            });
        }
        const data = { ...updateExpenseDto };
        if (data.expenseDate && !data.expenseDate.includes('T')) {
            data.expenseDate = new Date(data.expenseDate).toISOString();
        }
        const expense = await this.prisma.expense.update({
            where: { id },
            data,
            include: {
                account: {
                    select: {
                        id: true,
                        accountName: true,
                    },
                },
                project: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        });
        return expense;
    }
    async remove(id) {
        const expense = await this.findOne(id);
        await this.prisma.account.update({
            where: { id: expense.accountId },
            data: {
                currentBalance: {
                    increment: Number(expense.amount),
                },
            },
        });
        await this.prisma.expense.delete({
            where: { id },
        });
        return { message: 'Expense deleted successfully' };
    }
    async getTotalByProject(projectId) {
        const result = await this.prisma.expense.aggregate({
            where: { projectId },
            _sum: { amount: true },
            _count: true,
        });
        return {
            total: Number(result._sum.amount || 0),
            count: result._count,
        };
    }
    async getTotalByAccount(accountId) {
        const result = await this.prisma.expense.aggregate({
            where: { accountId },
            _sum: { amount: true },
            _count: true,
        });
        return {
            total: Number(result._sum.amount || 0),
            count: result._count,
        };
    }
};
exports.ExpenseService = ExpenseService;
exports.ExpenseService = ExpenseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_config_1.PrismaService])
], ExpenseService);
//# sourceMappingURL=expense.service.js.map