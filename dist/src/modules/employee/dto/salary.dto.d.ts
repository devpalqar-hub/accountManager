export declare class CalculateSalaryDto {
    employeeId: string;
    month: number;
    year: number;
}
export declare class ProcessSalaryDto {
    employeeId: string;
    month: number;
    year: number;
    deductions?: number;
    notes?: string;
}
export declare class UpdateSalaryRecordDto {
    deductions?: number;
    notes?: string;
    isProcessed?: boolean;
}
