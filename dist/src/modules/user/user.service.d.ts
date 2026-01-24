import { PrismaService } from '../../config/database.config';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ConfigService } from '@nestjs/config';
export declare class UserService {
    private prisma;
    private configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
