import { PrismaService } from '../../config/database.config';
import { CreateExpenseDto, UpdateExpenseDto } from './dto/expense.dto';
export declare class ExpenseService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createExpenseDto: CreateExpenseDto, userId: string): Promise<{
        user: {
            email: string;
            id: string;
        };
        project: {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            clientDetails: string | null;
            startDate: Date | null;
            endDate: Date | null;
            status: string | null;
            budget: import("@prisma/client/runtime/library").Decimal | null;
            createdBy: string;
        } | null;
        account: {
            id: string;
            accountName: string;
            accountHolderName: string;
        };
    } & {
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        projectId: string | null;
        accountId: string;
        addedBy: string;
        expenseDate: Date;
        reference: string | null;
    }>;
    findAll(): Promise<({
        user: {
            email: string;
            id: string;
        };
        project: {
            title: string;
            id: string;
        } | null;
        account: {
            id: string;
            accountName: string;
            accountHolderName: string;
        };
    } & {
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        projectId: string | null;
        accountId: string;
        addedBy: string;
        expenseDate: Date;
        reference: string | null;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            email: string;
            id: string;
        };
        project: {
            title: string;
            id: string;
            clientDetails: string | null;
        } | null;
        account: {
            id: string;
            accountName: string;
            accountHolderName: string;
            bankName: string | null;
            accountNumber: string | null;
        };
    } & {
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        projectId: string | null;
        accountId: string;
        addedBy: string;
        expenseDate: Date;
        reference: string | null;
    }>;
    findByProject(projectId: string): Promise<({
        user: {
            email: string;
            id: string;
        };
        account: {
            id: string;
            accountName: string;
        };
    } & {
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        projectId: string | null;
        accountId: string;
        addedBy: string;
        expenseDate: Date;
        reference: string | null;
    })[]>;
    findByAccount(accountId: string): Promise<({
        user: {
            email: string;
            id: string;
        };
        project: {
            title: string;
            id: string;
        } | null;
    } & {
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        projectId: string | null;
        accountId: string;
        addedBy: string;
        expenseDate: Date;
        reference: string | null;
    })[]>;
    update(id: string, updateExpenseDto: UpdateExpenseDto): Promise<{
        user: {
            email: string;
            id: string;
        };
        project: {
            title: string;
            id: string;
        } | null;
        account: {
            id: string;
            accountName: string;
        };
    } & {
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        projectId: string | null;
        accountId: string;
        addedBy: string;
        expenseDate: Date;
        reference: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getTotalByProject(projectId: string): Promise<{
        total: number;
        count: number;
    }>;
    getTotalByAccount(accountId: string): Promise<{
        total: number;
        count: number;
    }>;
}
