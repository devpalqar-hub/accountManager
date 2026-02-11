import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/database.config';
import { CreateTransactionLogDto, FilterTransactionLogsDto } from './dto/transaction-log.dto';

@Injectable()
export class TransactionLogService {
  constructor(private prisma: PrismaService) {}

  async create(createTransactionLogDto: CreateTransactionLogDto) {
    return this.prisma.transactionLog.create({
      data: createTransactionLogDto,
    });
  }

  async findAll(filters?: FilterTransactionLogsDto) {
    const where: any = {};

    if (filters?.transactionType) {
      where.transactionType = filters.transactionType;
    }

    if (filters?.accountId) {
      where.accountId = filters.accountId;
    }

    if (filters?.performedBy) {
      where.performedBy = filters.performedBy;
    }

    if (filters?.action) {
      where.action = { contains: filters.action };
    }

    if (filters?.projectId) {
      where.projectId = filters.projectId;
    }

    if (filters?.startDate || filters?.endDate) {
      where.createdAt = {};
      if (filters.startDate) {
        where.createdAt.gte = new Date(filters.startDate);
      }
      if (filters.endDate) {
        where.createdAt.lte = new Date(filters.endDate);
      }
    }

    return this.prisma.transactionLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.transactionLog.findUnique({
      where: { id },
    });
  }

  async getStats() {
    const [totalCredits, totalDebits, recentLogs, logsByAction] = await Promise.all([
      this.prisma.transactionLog.aggregate({
        where: { transactionType: 'CREDIT' },
        _sum: { amount: true },
        _count: true,
      }),
      this.prisma.transactionLog.aggregate({
        where: { transactionType: 'DEBIT' },
        _sum: { amount: true },
        _count: true,
      }),
      this.prisma.transactionLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.transactionLog.groupBy({
        by: ['action'],
        _count: true,
        _sum: { amount: true },
      }),
    ]);

    return {
      totalCredits: {
        amount: Number(totalCredits._sum.amount || 0),
        count: totalCredits._count,
      },
      totalDebits: {
        amount: Number(totalDebits._sum.amount || 0),
        count: totalDebits._count,
      },
      netBalance: Number(totalCredits._sum.amount || 0) - Number(totalDebits._sum.amount || 0),
      recentLogs,
      logsByAction: logsByAction.map(item => ({
        action: item.action,
        count: item._count,
        totalAmount: Number(item._sum.amount || 0),
      })),
    };
  }
}
