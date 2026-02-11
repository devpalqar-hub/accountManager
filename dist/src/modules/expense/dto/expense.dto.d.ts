export declare class CreateExpenseDto {
    title: string;
    description: string;
    amount: number;
    accountId: string;
    projectId?: string;
    expenseDate?: string;
    reference?: string;
}
export declare class UpdateExpenseDto {
    title?: string;
    description?: string;
    amount?: number;
    accountId?: string;
    projectId?: string;
    expenseDate?: string;
    reference?: string;
}
