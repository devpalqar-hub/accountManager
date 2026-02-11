export declare class CreateAccountDto {
    accountName: string;
    accountHolderName: string;
    bankName?: string;
    accountNumber?: string;
    ifscCode?: string;
    accountType?: string;
    openingBalance?: number;
    isPrimary?: boolean;
    isActive?: boolean;
}
export declare class UpdateAccountDto {
    accountName?: string;
    accountHolderName?: string;
    bankName?: string;
    accountNumber?: string;
    ifscCode?: string;
    accountType?: string;
    isPrimary?: boolean;
    isActive?: boolean;
}
