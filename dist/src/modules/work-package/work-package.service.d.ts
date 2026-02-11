import { PrismaService } from '../../config/database.config';
import { CreateWorkPackageDto, UpdateWorkPackageDto } from './dto/work-package.dto';
export declare class WorkPackageService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createWorkPackageDto: CreateWorkPackageDto): Promise<{
        project: {
            title: string;
            id: string;
        };
    } & {
        description: string | null;
        version: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date | null;
        status: import(".prisma/client").$Enums.WorkPackageStatus | null;
        workPackageName: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        projectId: string;
        completionDate: Date | null;
        advanceAmount: import("@prisma/client/runtime/library").Decimal | null;
        miscellaneousAmount: import("@prisma/client/runtime/library").Decimal | null;
        ongoingCost: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    findAll(): Promise<({
        project: {
            title: string;
            id: string;
        };
    } & {
        description: string | null;
        version: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date | null;
        status: import(".prisma/client").$Enums.WorkPackageStatus | null;
        workPackageName: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        projectId: string;
        completionDate: Date | null;
        advanceAmount: import("@prisma/client/runtime/library").Decimal | null;
        miscellaneousAmount: import("@prisma/client/runtime/library").Decimal | null;
        ongoingCost: import("@prisma/client/runtime/library").Decimal | null;
    })[]>;
    findOne(id: string): Promise<{
        project: {
            title: string;
            id: string;
            clientDetails: string | null;
        };
    } & {
        description: string | null;
        version: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date | null;
        status: import(".prisma/client").$Enums.WorkPackageStatus | null;
        workPackageName: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        projectId: string;
        completionDate: Date | null;
        advanceAmount: import("@prisma/client/runtime/library").Decimal | null;
        miscellaneousAmount: import("@prisma/client/runtime/library").Decimal | null;
        ongoingCost: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    findByProject(projectId: string): Promise<({
        project: {
            title: string;
            id: string;
        };
    } & {
        description: string | null;
        version: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date | null;
        status: import(".prisma/client").$Enums.WorkPackageStatus | null;
        workPackageName: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        projectId: string;
        completionDate: Date | null;
        advanceAmount: import("@prisma/client/runtime/library").Decimal | null;
        miscellaneousAmount: import("@prisma/client/runtime/library").Decimal | null;
        ongoingCost: import("@prisma/client/runtime/library").Decimal | null;
    })[]>;
    update(id: string, updateWorkPackageDto: UpdateWorkPackageDto): Promise<{
        project: {
            title: string;
            id: string;
        };
    } & {
        description: string | null;
        version: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date | null;
        status: import(".prisma/client").$Enums.WorkPackageStatus | null;
        workPackageName: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        projectId: string;
        completionDate: Date | null;
        advanceAmount: import("@prisma/client/runtime/library").Decimal | null;
        miscellaneousAmount: import("@prisma/client/runtime/library").Decimal | null;
        ongoingCost: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getWorkPackageStats(projectId: string): Promise<{
        totalWorkPackages: number;
        totalAmount: number;
        totalAdvance: number;
        totalMiscellaneous: number;
        totalOngoingCost: number;
        balance: number;
        statusBreakdown: {
            pending: number;
            inProgress: number;
            completed: number;
            onHold: number;
        };
    }>;
}
