import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/database.config';
import { CreateAccountDto, UpdateAccountDto } from './dto/account.dto';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async create(createAccountDto: CreateAccountDto) {
    const { openingBalance, ...accountData } = createAccountDto;

    const account = await this.prisma.account.create({
      data: {
        ...accountData,
        openingBalance: openingBalance || 0,
        currentBalance: openingBalance || 0,
      },
    });

    return account;
  }

  async findAll() {
    return this.prisma.account.findMany({
      include: {
        _count: {
          select: {
            payments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const account = await this.prisma.account.findUnique({
      where: { id },
      include: {
        payments: {
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
            paymentDate: 'desc',
          },
          take: 10,
        },
        _count: {
          select: {
            payments: true,
          },
        },
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account;
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    await this.findOne(id);

    const account = await this.prisma.account.update({
      where: { id },
      data: updateAccountDto,
    });

    return account;
  }

  async remove(id: string) {
    await this.findOne(id);

    const paymentsCount = await this.prisma.payment.count({
      where: { accountId: id },
    });

    if (paymentsCount > 0) {
      throw new Error(
        'Cannot delete account with existing payments. Please delete payments first.',
      );
    }

    await this.prisma.account.delete({
      where: { id },
    });

    return { message: 'Account deleted successfully' };
  }

  async getAccountBalance(id: string) {
    const account = await this.findOne(id);

    const totalCredits = await this.prisma.payment.aggregate({
      where: { accountId: id },
      _sum: {
        amount: true,
      },
    });

    return {
      accountId: account.id,
      accountName: account.accountName,
      openingBalance: account.openingBalance,
      totalCredits: totalCredits._sum.amount || 0,
      currentBalance: account.currentBalance,
    };
  }
}
