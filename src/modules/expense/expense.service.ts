import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/database.config';
import { CreateExpenseDto, UpdateExpenseDto } from './dto/expense.dto';
import { TransactionLogService } from '../transaction-log/transaction-log.service';
import { TransactionType } from '../transaction-log/dto/transaction-log.dto';

@Injectable()
export class ExpenseService {
  constructor(
    private prisma: PrismaService,
    private transactionLogService: TransactionLogService,
  ) {}

  async create(createExpenseDto: CreateExpenseDto, userId: string) {
    const { accountId, projectId, ...expenseData } = createExpenseDto;

    if (!userId) {
      throw new NotFoundException('User ID is required');
    }

    // Verify account exists
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    });
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    // Verify project exists if provided
    if (projectId) {
      const project = await this.prisma.project.findUnique({
        where: { id: projectId },
      });
      if (!project) {
        throw new NotFoundException('Project not found');
      }
    }

    // Convert date string to ISO-8601 DateTime format if needed
    const data: any = { ...expenseData };
    if (data.expenseDate && !data.expenseDate.includes('T')) {
      data.expenseDate = new Date(data.expenseDate).toISOString();
    }

    // Create expense
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

    // Decrease account balance (expense reduces balance)
    await this.prisma.account.update({
      where: { id: accountId },
      data: {
        currentBalance: {
          decrement: createExpenseDto.amount,
        },
      },
    });

    // Create transaction log
    await this.transactionLogService.create({
      transactionType: TransactionType.DEBIT,
      amount: createExpenseDto.amount,
      accountId: account.id,
      accountName: account.accountName,
      performedBy: userId,
      performedByEmail: expense.user.email,
      action: 'Expense',
      description: createExpenseDto.description || `Expense: ${createExpenseDto.title}`,
      referenceId: expense.id,
      referenceType: 'expense',
      projectId: projectId || undefined,
      projectTitle: expense.project?.title || undefined,
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

  async findOne(id: string) {
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
      throw new NotFoundException('Expense not found');
    }

    return expense;
  }

  async findByProject(projectId: string) {
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

  async findByAccount(accountId: string) {
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

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    const existingExpense = await this.findOne(id);

    const oldAmount = Number(existingExpense.amount);
    const newAmount = updateExpenseDto.amount || oldAmount;
    const amountDifference = newAmount - oldAmount;

    // Handle account change
    if (
      updateExpenseDto.accountId &&
      updateExpenseDto.accountId !== existingExpense.accountId
    ) {
      // Verify new account exists
      const newAccount = await this.prisma.account.findUnique({
        where: { id: updateExpenseDto.accountId },
      });
      if (!newAccount) {
        throw new NotFoundException('New account not found');
      }

      // Add back to old account (reverse the expense)
      await this.prisma.account.update({
        where: { id: existingExpense.accountId },
        data: {
          currentBalance: {
            increment: oldAmount,
          },
        },
      });

      // Deduct from new account
      await this.prisma.account.update({
        where: { id: updateExpenseDto.accountId },
        data: {
          currentBalance: {
            decrement: newAmount,
          },
        },
      });
    } else if (amountDifference !== 0) {
      // Update same account balance
      await this.prisma.account.update({
        where: { id: existingExpense.accountId },
        data: {
          currentBalance: {
            decrement: amountDifference,
          },
        },
      });
    }

    // Convert date string to ISO-8601 DateTime format if needed
    const data: any = { ...updateExpenseDto };
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

  async remove(id: string) {
    const expense = await this.findOne(id);

    // Add back to account balance (reverse the expense)
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

  async getTotalByProject(projectId: string) {
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

  async getTotalByAccount(accountId: string) {
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
}
