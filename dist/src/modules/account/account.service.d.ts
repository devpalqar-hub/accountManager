import { PrismaService } from '../../config/database.config';
import { CreateAccountDto, UpdateAccountDto } from './dto/account.dto';
export declare class AccountService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAccountDto: CreateAccountDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateAccountDto: UpdateAccountDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getAccountBalance(id: string): Promise<{
        accountId: any;
        accountName: any;
        openingBalance: any;
        totalCredits: any;
        currentBalance: any;
    }>;
}
