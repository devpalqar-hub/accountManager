import { PrismaService } from '../../config/database.config';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboardOverview(): Promise<{
        projects: {
            total: any;
            active: any;
            inactive: number;
        };
        workPackages: {
            total: any;
            byStatus: any;
        };
        financial: {
            totalWorkPackageAmount: any;
            totalPaid: number;
            totalPending: number;
            paymentPercentage: string | number;
        };
        accounts: {
            total: any;
            active: any;
            inactive: number;
        };
    }>;
    getProjectAnalytics(): Promise<{
        projects: any;
        summary: {
            totalProjects: any;
            totalBudget: any;
            totalWorkPackageAmount: any;
            totalPaid: any;
            totalPending: any;
        };
    }>;
    getFinancialAnalytics(startDate?: string, endDate?: string): Promise<{
        totalRevenue: any;
        totalPayments: any;
        averagePayment: number;
        paymentsByAccount: any;
        paymentsByProject: any;
        paymentsByMonth: any;
        accountBalances: any;
        totalAccountBalance: any;
    }>;
    getWorkPackageAnalytics(): Promise<{
        total: any;
        statusDistribution: any;
        financial: {
            totalAmount: any;
            totalAdvance: any;
            totalMiscellaneous: any;
            totalOngoingCost: any;
            balance: number;
        };
        completion: {
            completed: any;
            inProgress: any;
            completionRate: string | number;
        };
        workPackagesByProject: any;
    }>;
    getMonthlyReport(year: number, month: number): Promise<{
        period: string;
        revenue: {
            total: any;
            paymentsCount: any;
            averagePayment: number;
        };
        payments: any;
        activity: {
            projectsCreated: any;
            workPackagesCreated: any;
            paymentsReceived: any;
        };
    }>;
    getYearlyReport(year: number): Promise<{
        year: number;
        revenue: {
            total: any;
            paymentsCount: any;
            averagePayment: number;
        };
        monthlyBreakdown: any;
        activity: {
            projectsCreated: any;
            workPackagesCreated: any;
            paymentsReceived: any;
        };
    }>;
}
