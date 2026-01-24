import { AccountService } from './account.service';
import { CreateAccountDto, UpdateAccountDto } from './dto/account.dto';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    create(createAccountDto: CreateAccountDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    getBalance(id: string): Promise<{
        accountId: any;
        accountName: any;
        openingBalance: any;
        totalCredits: any;
        currentBalance: any;
    }>;
    update(id: string, updateAccountDto: UpdateAccountDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
