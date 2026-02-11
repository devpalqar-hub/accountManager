import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
