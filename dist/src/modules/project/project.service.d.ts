import { PrismaService } from '../../config/database.config';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
export declare class ProjectService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProjectDto: CreateProjectDto, userId: string): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findByUser(userId: string): Promise<any>;
}
