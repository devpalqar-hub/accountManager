import { PrismaService } from '../../config/database.config';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/payment.dto';
import { Decimal } from '@prisma/client/runtime/library';
export declare class PaymentService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPaymentDto: CreatePaymentDto, userId: string): Promise<{
        user: {
            email: string;
            id: string;
        };
        project: {
            title: string;
            id: string;
            clientDetails: string | null;
        };
        account: {
            id: string;
            accountName: string;
            accountHolderName: string;
        };
    } & {
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: Decimal;
        projectId: string;
        paymentDate: Date;
        accountId: string;
        transactionRef: string | null;
        addedBy: string;
    }>;
    findAll(): Promise<({
        user: {
            email: string;
            id: string;
        };
        project: {
            title: string;
            id: string;
        };
        account: {
            id: string;
            accountName: string;
        };
    } & {
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: Decimal;
        projectId: string;
        paymentDate: Date;
        accountId: string;
        transactionRef: string | null;
        addedBy: string;
    })[]>;
    findOne(id: string): Promise<{
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
            budget: Decimal | null;
            createdBy: string;
        };
        account: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            accountName: string;
            accountHolderName: string;
            bankName: string | null;
            accountNumber: string | null;
            ifscCode: string | null;
            accountType: string | null;
            openingBalance: Decimal | null;
            currentBalance: Decimal;
        };
    } & {
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: Decimal;
        projectId: string;
        paymentDate: Date;
        accountId: string;
        transactionRef: string | null;
        addedBy: string;
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
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: Decimal;
        projectId: string;
        paymentDate: Date;
        accountId: string;
        transactionRef: string | null;
        addedBy: string;
    })[]>;
    findByAccount(accountId: string): Promise<({
        user: {
            email: string;
            id: string;
        };
        project: {
            title: string;
            id: string;
        };
    } & {
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: Decimal;
        projectId: string;
        paymentDate: Date;
        accountId: string;
        transactionRef: string | null;
        addedBy: string;
    })[]>;
    update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<{
        user: {
            email: string;
            id: string;
        };
        project: {
            title: string;
            id: string;
        };
        account: {
            id: string;
            accountName: string;
        };
    } & {
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        amount: Decimal;
        projectId: string;
        paymentDate: Date;
        accountId: string;
        transactionRef: string | null;
        addedBy: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getProjectPaymentSummary(projectId: string): Promise<{
        projectId: string;
        projectTitle: string;
        totalWorkPackageAmount: number;
        totalPaid: number;
        pendingAmount: number;
        paymentPercentage: string | number;
    }>;
}
