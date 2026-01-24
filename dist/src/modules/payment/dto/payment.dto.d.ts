export declare class CreatePaymentDto {
    amount: number;
    accountId: string;
    projectId: string;
    paymentDate?: string;
    description?: string;
    transactionRef?: string;
}
export declare class UpdatePaymentDto {
    amount?: number;
    accountId?: string;
    paymentDate?: string;
    description?: string;
    transactionRef?: string;
}
