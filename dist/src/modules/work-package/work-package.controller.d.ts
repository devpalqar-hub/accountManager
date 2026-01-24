import { WorkPackageService } from './work-package.service';
import { CreateWorkPackageDto, UpdateWorkPackageDto } from './dto/work-package.dto';
export declare class WorkPackageController {
    private readonly workPackageService;
    constructor(workPackageService: WorkPackageService);
    create(createWorkPackageDto: CreateWorkPackageDto): Promise<any>;
    findAll(): Promise<any>;
    findByProject(projectId: string): Promise<any>;
    getStats(projectId: string): Promise<{
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
    findOne(id: string): Promise<any>;
    update(id: string, updateWorkPackageDto: UpdateWorkPackageDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
