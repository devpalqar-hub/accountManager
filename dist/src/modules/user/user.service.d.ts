import { PrismaService } from '../../config/database.config';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ConfigService } from '@nestjs/config';
export declare class UserService {
    private prisma;
    private configService;
    constructor(prisma: PrismaService, configService: ConfigService);
    create(createUserDto: CreateUserDto): Promise<{
        email: string;
        id: string;
        role: "ADMIN";
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        email: string;
        id: string;
        role: "ADMIN";
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        email: string;
        id: string;
        role: "ADMIN";
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        id: string;
        role: "ADMIN";
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
