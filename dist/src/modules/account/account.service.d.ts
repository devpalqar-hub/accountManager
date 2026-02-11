import { PrismaService } from '../../config/database.config';
import { CreateAccountDto, UpdateAccountDto } from './dto/account.dto';
export declare class AccountService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAccountDto: CreateAccountDto): Promise<{
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
        openingBalance: import("@prisma/client/runtime/library").Decimal | null;
        isPrimary: boolean;
        currentBalance: import("@prisma/client/runtime/library").Decimal;
    }>;
    findAll(): Promise<({
        _count: {
            payments: number;
        };
    } & {
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
        openingBalance: import("@prisma/client/runtime/library").Decimal | null;
        isPrimary: boolean;
        currentBalance: import("@prisma/client/runtime/library").Decimal;
    })[]>;
    findOne(id: string): Promise<{
        payments: ({
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
            amount: import("@prisma/client/runtime/library").Decimal;
            projectId: string;
            paymentDate: Date;
            accountId: string;
            transactionRef: string | null;
            addedBy: string;
        })[];
        _count: {
            payments: number;
        };
    } & {
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
        openingBalance: import("@prisma/client/runtime/library").Decimal | null;
        isPrimary: boolean;
        currentBalance: import("@prisma/client/runtime/library").Decimal;
    }>;
    update(id: string, updateAccountDto: UpdateAccountDto): Promise<{
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
        openingBalance: import("@prisma/client/runtime/library").Decimal | null;
        isPrimary: boolean;
        currentBalance: import("@prisma/client/runtime/library").Decimal;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getAccountBalance(id: string): Promise<{
        accountId: string;
        accountName: string;
        openingBalance: import("@prisma/client/runtime/library").Decimal | null;
        totalCredits: number | import("@prisma/client/runtime/library").Decimal;
        currentBalance: import("@prisma/client/runtime/library").Decimal;
    }>;
}
