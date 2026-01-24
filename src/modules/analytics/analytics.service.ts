import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/database.config';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardOverview() {
    const [
      totalProjects,
      activeProjects,
      totalWorkPackages,
      totalPayments,
      totalAccounts,
      activeAccounts,
    ] = await Promise.all([
      this.prisma.project.count(),
      this.prisma.project.count({ where: { status: 'ACTIVE' } }),
      this.prisma.workPackage.count(),
      this.prisma.payment.aggregate({ _sum: { amount: true } }),
      this.prisma.account.count(),
      this.prisma.account.count({ where: { isActive: true } }),
    ]);

    const workPackages = await this.prisma.workPackage.findMany();
    const totalWorkPackageAmount = workPackages.reduce(
      (sum, wp) => sum + Number(wp.amount),
      0,
    );

    const totalPaid = Number(totalPayments._sum.amount || 0);
    const totalPending = totalWorkPackageAmount - totalPaid;

    const workPackagesByStatus = await this.prisma.workPackage.groupBy({
      by: ['status'],
      _count: true,
    });

    return {
      projects: {
        total: totalProjects,
        active: activeProjects,
        inactive: totalProjects - activeProjects,
      },
      workPackages: {
        total: totalWorkPackages,
        byStatus: workPackagesByStatus,
      },
      financial: {
        totalWorkPackageAmount,
        totalPaid,
        totalPending,
        paymentPercentage:
          totalWorkPackageAmount > 0
            ? ((totalPaid / totalWorkPackageAmount) * 100).toFixed(2)
            : 0,
      },
      accounts: {
        total: totalAccounts,
        active: activeAccounts,
        inactive: totalAccounts - activeAccounts,
      },
    };
  }

  async getProjectAnalytics() {
    const projects = await this.prisma.project.findMany({
      include: {
        workPackages: true,
        payments: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    const projectAnalytics = projects.map((project) => {
      const totalWorkPackageAmount = project.workPackages.reduce(
        (sum, wp) => sum + Number(wp.amount),
        0,
      );
      const totalPaid = project.payments.reduce(
        (sum, p) => sum + Number(p.amount),
        0,
      );
      const pending = totalWorkPackageAmount - totalPaid;

      const completedWorkPackages = project.workPackages.filter(
        (wp) => wp.status === 'COMPLETED',
      ).length;
      const totalWorkPackages = project.workPackages.length;

      return {
        projectId: project.id,
        projectTitle: project.title,
        status: project.status,
        clientDetails: project.clientDetails,
        createdBy: project.user.email,
        budget: Number(project.budget || 0),
        totalWorkPackages,
        completedWorkPackages,
        completionPercentage:
          totalWorkPackages > 0
            ? ((completedWorkPackages / totalWorkPackages) * 100).toFixed(2)
            : 0,
        financial: {
          totalWorkPackageAmount,
          totalPaid,
          pending,
          paymentPercentage:
            totalWorkPackageAmount > 0
              ? ((totalPaid / totalWorkPackageAmount) * 100).toFixed(2)
              : 0,
        },
        startDate: project.startDate,
        endDate: project.endDate,
      };
    });

    return {
      projects: projectAnalytics,
      summary: {
        totalProjects: projects.length,
        totalBudget: projectAnalytics.reduce((sum, p) => sum + p.budget, 0),
        totalWorkPackageAmount: projectAnalytics.reduce(
          (sum, p) => sum + p.financial.totalWorkPackageAmount,
          0,
        ),
        totalPaid: projectAnalytics.reduce(
          (sum, p) => sum + p.financial.totalPaid,
          0,
        ),
        totalPending: projectAnalytics.reduce(
          (sum, p) => sum + p.financial.pending,
          0,
        ),
      },
    };
  }

  async getFinancialAnalytics(startDate?: string, endDate?: string) {
    const dateFilter: any = {};
    if (startDate) {
      dateFilter.gte = new Date(startDate);
    }
    if (endDate) {
      dateFilter.lte = new Date(endDate);
    }

    const payments = await this.prisma.payment.findMany({
      where: startDate || endDate ? { paymentDate: dateFilter } : {},
      include: {
        account: {
          select: {
            accountName: true,
          },
        },
        project: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        paymentDate: 'asc',
      },
    });

    const accountBalances = await this.prisma.account.findMany({
      select: {
        accountName: true,
        currentBalance: true,
        isActive: true,
      },
    });

    const paymentsByAccount = payments.reduce(
      (acc, payment) => {
        const accountName = payment.account.accountName;
        if (!acc[accountName]) {
          acc[accountName] = 0;
        }
        acc[accountName] += Number(payment.amount);
        return acc;
      },
      {} as Record<string, number>,
    );

    const paymentsByProject = payments.reduce(
      (acc, payment) => {
        const projectTitle = payment.project.title;
        if (!acc[projectTitle]) {
          acc[projectTitle] = 0;
        }
        acc[projectTitle] += Number(payment.amount);
        return acc;
      },
      {} as Record<string, number>,
    );

    const paymentsByMonth = payments.reduce(
      (acc, payment) => {
        const month = new Date(payment.paymentDate)
          .toISOString()
          .substring(0, 7);
        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += Number(payment.amount);
        return acc;
      },
      {} as Record<string, number>,
    );

    const totalRevenue = payments.reduce(
      (sum, p) => sum + Number(p.amount),
      0,
    );

    return {
      totalRevenue,
      totalPayments: payments.length,
      averagePayment: payments.length > 0 ? totalRevenue / payments.length : 0,
      paymentsByAccount,
      paymentsByProject,
      paymentsByMonth,
      accountBalances: accountBalances.map((acc) => ({
        accountName: acc.accountName,
        balance: Number(acc.currentBalance),
        isActive: acc.isActive,
      })),
      totalAccountBalance: accountBalances.reduce(
        (sum, acc) => sum + Number(acc.currentBalance),
        0,
      ),
    };
  }

  async getWorkPackageAnalytics() {
    const workPackages = await this.prisma.workPackage.findMany({
      include: {
        project: {
          select: {
            title: true,
          },
        },
      },
    });

    const statusDistribution = workPackages.reduce(
      (acc, wp) => {
        const status = wp.status || 'UNKNOWN';
        if (!acc[status]) {
          acc[status] = 0;
        }
        acc[status]++;
        return acc;
      },
      {} as Record<string, number>,
    );

    const totalAmount = workPackages.reduce(
      (sum, wp) => sum + Number(wp.amount),
      0,
    );
    const totalAdvance = workPackages.reduce(
      (sum, wp) => sum + Number(wp.advanceAmount || 0),
      0,
    );
    const totalMiscellaneous = workPackages.reduce(
      (sum, wp) => sum + Number(wp.miscellaneousAmount || 0),
      0,
    );
    const totalOngoingCost = workPackages.reduce(
      (sum, wp) => sum + Number(wp.ongoingCost || 0),
      0,
    );

    const completedWorkPackages = workPackages.filter(
      (wp) => wp.status === 'COMPLETED',
    );
    const inProgressWorkPackages = workPackages.filter(
      (wp) => wp.status === 'IN_PROGRESS',
    );

    return {
      total: workPackages.length,
      statusDistribution,
      financial: {
        totalAmount,
        totalAdvance,
        totalMiscellaneous,
        totalOngoingCost,
        balance: totalAmount - totalAdvance,
      },
      completion: {
        completed: completedWorkPackages.length,
        inProgress: inProgressWorkPackages.length,
        completionRate:
          workPackages.length > 0
            ? ((completedWorkPackages.length / workPackages.length) * 100).toFixed(
                2,
              )
            : 0,
      },
      workPackagesByProject: workPackages.reduce(
        (acc, wp) => {
          const projectTitle = wp.project.title;
          if (!acc[projectTitle]) {
            acc[projectTitle] = {
              count: 0,
              totalAmount: 0,
            };
          }
          acc[projectTitle].count++;
          acc[projectTitle].totalAmount += Number(wp.amount);
          return acc;
        },
        {} as Record<string, { count: number; totalAmount: number }>,
      ),
    };
  }

  async getMonthlyReport(year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const payments = await this.prisma.payment.findMany({
      where: {
        paymentDate: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        account: {
          select: {
            accountName: true,
          },
        },
        project: {
          select: {
            title: true,
          },
        },
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    const workPackagesCreated = await this.prisma.workPackage.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const projectsCreated = await this.prisma.project.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);

    return {
      period: `${year}-${month.toString().padStart(2, '0')}`,
      revenue: {
        total: totalRevenue,
        paymentsCount: payments.length,
        averagePayment: payments.length > 0 ? totalRevenue / payments.length : 0,
      },
      payments: payments.map((p) => ({
        id: p.id,
        amount: Number(p.amount),
        date: p.paymentDate,
        account: p.account.accountName,
        project: p.project.title,
        addedBy: p.user.email,
      })),
      activity: {
        projectsCreated,
        workPackagesCreated,
        paymentsReceived: payments.length,
      },
    };
  }

  async getYearlyReport(year: number) {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59);

    const payments = await this.prisma.payment.findMany({
      where: {
        paymentDate: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const monthlyBreakdown = payments.reduce(
      (acc, payment) => {
        const month = new Date(payment.paymentDate).getMonth() + 1;
        if (!acc[month]) {
          acc[month] = {
            revenue: 0,
            count: 0,
          };
        }
        acc[month].revenue += Number(payment.amount);
        acc[month].count++;
        return acc;
      },
      {} as Record<number, { revenue: number; count: number }>,
    );

    const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);

    const projectsCreated = await this.prisma.project.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const workPackagesCreated = await this.prisma.workPackage.count({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return {
      year,
      revenue: {
        total: totalRevenue,
        paymentsCount: payments.length,
        averagePayment: payments.length > 0 ? totalRevenue / payments.length : 0,
      },
      monthlyBreakdown,
      activity: {
        projectsCreated,
        workPackagesCreated,
        paymentsReceived: payments.length,
      },
    };
  }
}
