export declare class CreateAccountDto {
    accountName: string;
    accountHolderName: string;
    bankName?: string;
    accountNumber?: string;
    ifscCode?: string;
    accountType?: string;
    openingBalance?: number;
    isActive?: boolean;
}
export declare class UpdateAccountDto {
    accountName?: string;
    accountHolderName?: string;
    bankName?: string;
    accountNumber?: string;
    ifscCode?: string;
    accountType?: string;
    isActive?: boolean;
}
