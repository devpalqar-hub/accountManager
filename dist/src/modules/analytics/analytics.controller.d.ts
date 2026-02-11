import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getDashboard(): Promise<{
        projects: {
            total: number;
            active: number;
            inactive: number;
        };
        workPackages: {
            total: number;
            byStatus: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.WorkPackageGroupByOutputType, "status"[]> & {
                _count: number;
            })[];
        };
        financial: {
            totalWorkPackageAmount: number;
            totalPaid: number;
            totalPending: number;
            paymentPercentage: string | number;
        };
        accounts: {
            total: number;
            active: number;
            inactive: number;
        };
    }>;
    getProjectAnalytics(): Promise<{
        projects: {
            projectId: string;
            projectTitle: string;
            status: string | null;
            clientDetails: string | null;
            createdBy: string;
            budget: number;
            totalWorkPackages: number;
            completedWorkPackages: number;
            completionPercentage: string | number;
            financial: {
                totalWorkPackageAmount: number;
                totalPaid: number;
                pending: number;
                paymentPercentage: string | number;
            };
            startDate: Date | null;
            endDate: Date | null;
        }[];
        summary: {
            totalProjects: number;
            totalBudget: number;
            totalWorkPackageAmount: number;
            totalPaid: number;
            totalPending: number;
        };
    }>;
    getFinancialAnalytics(startDate?: string, endDate?: string): Promise<{
        totalRevenue: number;
        totalPayments: number;
        averagePayment: number;
        paymentsByAccount: Record<string, number>;
        paymentsByProject: Record<string, number>;
        paymentsByMonth: Record<string, number>;
        accountBalances: {
            accountName: string;
            balance: number;
            isActive: boolean;
        }[];
        totalAccountBalance: number;
    }>;
    getWorkPackageAnalytics(): Promise<{
        total: number;
        statusDistribution: Record<string, number>;
        financial: {
            totalAmount: number;
            totalAdvance: number;
            totalMiscellaneous: number;
            totalOngoingCost: number;
            balance: number;
        };
        completion: {
            completed: number;
            inProgress: number;
            completionRate: string | number;
        };
        workPackagesByProject: Record<string, {
            count: number;
            totalAmount: number;
        }>;
    }>;
    getMonthlyReport(year: string, month: string): Promise<{
        period: string;
        revenue: {
            total: number;
            paymentsCount: number;
            averagePayment: number;
        };
        payments: {
            id: string;
            amount: number;
            date: Date;
            account: string;
            project: string;
            addedBy: string;
        }[];
        activity: {
            projectsCreated: number;
            workPackagesCreated: number;
            paymentsReceived: number;
        };
    }>;
    getYearlyReport(year: string): Promise<{
        year: number;
        revenue: {
            total: number;
            paymentsCount: number;
            averagePayment: number;
        };
        monthlyBreakdown: Record<number, {
            revenue: number;
            count: number;
        }>;
        activity: {
            projectsCreated: number;
            workPackagesCreated: number;
            paymentsReceived: number;
        };
    }>;
}
