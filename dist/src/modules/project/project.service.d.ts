import { PrismaService } from '../../config/database.config';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
export declare class ProjectService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProjectDto: CreateProjectDto, userId: string): Promise<{
        user: {
            email: string;
            id: string;
        };
    } & {
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
    }>;
    findAll(): Promise<({
        user: {
            email: string;
            id: string;
        };
    } & {
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
    })[]>;
    findOne(id: string): Promise<{
        user: {
            email: string;
            id: string;
        };
    } & {
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
    }>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<{
        user: {
            email: string;
            id: string;
        };
    } & {
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
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findByUser(userId: string): Promise<({
        user: {
            email: string;
            id: string;
        };
    } & {
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
    })[]>;
}
