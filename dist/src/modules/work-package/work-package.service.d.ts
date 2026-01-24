import { PrismaService } from '../../config/database.config';
import { CreateWorkPackageDto, UpdateWorkPackageDto } from './dto/work-package.dto';
export declare class WorkPackageService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createWorkPackageDto: CreateWorkPackageDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    findByProject(projectId: string): Promise<any>;
    update(id: string, updateWorkPackageDto: UpdateWorkPackageDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getWorkPackageStats(projectId: string): Promise<{
        totalWorkPackages: any;
        totalAmount: any;
        totalAdvance: any;
        totalMiscellaneous: any;
        totalOngoingCost: any;
        balance: number;
        statusBreakdown: {
            pending: any;
            inProgress: any;
            completed: any;
            onHold: any;
        };
    }>;
}
