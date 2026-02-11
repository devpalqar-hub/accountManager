import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/database.config';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/payment.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto, userId: string) {
    const { accountId, projectId, ...paymentData } = createPaymentDto;

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

    // Verify project exists
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }

    // Convert date string to ISO-8601 DateTime format if needed
    const data: any = { ...paymentData };
    if (data.paymentDate && !data.paymentDate.includes('T')) {
      data.paymentDate = new Date(data.paymentDate).toISOString();
    }

    // Create payment
    const payment = await this.prisma.payment.create({
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

    // Update account balance
    await this.prisma.account.update({
      where: { id: accountId },
      data: {
        currentBalance: {
          increment: createPaymentDto.amount,
        },
      },
    });

    return payment;
  }

  async findAll() {
    return this.prisma.payment.findMany({
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
      orderBy: {
        paymentDate: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: {
        account: true,
        project: true,
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  async findByProject(projectId: string) {
    return this.prisma.payment.findMany({
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
        paymentDate: 'desc',
      },
    });
  }

  async findByAccount(accountId: string) {
    return this.prisma.payment.findMany({
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
        paymentDate: 'desc',
      },
    });
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    const existingPayment = await this.findOne(id);

    const oldAmount = Number(existingPayment.amount);
    const newAmount = updatePaymentDto.amount || oldAmount;
    const amountDifference = newAmount - oldAmount;

    // Handle account change
    if (
      updatePaymentDto.accountId &&
      updatePaymentDto.accountId !== existingPayment.accountId
    ) {
      // Verify new account exists
      const newAccount = await this.prisma.account.findUnique({
        where: { id: updatePaymentDto.accountId },
      });
      if (!newAccount) {
        throw new NotFoundException('New account not found');
      }

      // Deduct from old account
      await this.prisma.account.update({
        where: { id: existingPayment.accountId },
        data: {
          currentBalance: {
            decrement: oldAmount,
          },
        },
      });

      // Add to new account
      await this.prisma.account.update({
        where: { id: updatePaymentDto.accountId },
        data: {
          currentBalance: {
            increment: newAmount,
          },
        },
      });
    } else if (amountDifference !== 0) {
      // Update same account balance
      await this.prisma.account.update({
        where: { id: existingPayment.accountId },
        data: {
          currentBalance: {
            increment: amountDifference,
          },
        },
      });
    }

    // Convert date string to ISO-8601 DateTime format if needed
    const data: any = { ...updatePaymentDto };
    if (data.paymentDate && !data.paymentDate.includes('T')) {
      data.paymentDate = new Date(data.paymentDate).toISOString();
    }

    const payment = await this.prisma.payment.update({
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

    return payment;
  }

  async remove(id: string) {
    const payment = await this.findOne(id);

    // Update account balance
    await this.prisma.account.update({
      where: { id: payment.accountId },
      data: {
        currentBalance: {
          decrement: Number(payment.amount),
        },
      },
    });

    await this.prisma.payment.delete({
      where: { id },
    });

    return { message: 'Payment deleted successfully' };
  }

  async getProjectPaymentSummary(projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        workPackages: true,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const payments = await this.prisma.payment.aggregate({
      where: { projectId },
      _sum: {
        amount: true,
      },
    });

    const totalWorkPackageAmount = project.workPackages.reduce(
      (sum, wp) => sum + Number(wp.amount),
      0,
    );

    const totalPaid = Number(payments._sum.amount || 0);
    const pendingAmount = totalWorkPackageAmount - totalPaid;

    return {
      projectId: project.id,
      projectTitle: project.title,
      totalWorkPackageAmount,
      totalPaid,
      pendingAmount,
      paymentPercentage:
        totalWorkPackageAmount > 0
          ? ((totalPaid / totalWorkPackageAmount) * 100).toFixed(2)
          : 0,
    };
  }
}
