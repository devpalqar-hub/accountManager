import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    create(createProjectDto: CreateProjectDto, user: any): Promise<any>;
    findAll(): Promise<any>;
    findMyProjects(user: any): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
