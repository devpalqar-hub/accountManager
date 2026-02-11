export declare class CreateEmployeeDto {
    name: string;
    email: string;
    phone?: string;
    designation?: string;
    joiningDate?: string;
    dailySalary: number;
    paidLeavesPerMonth?: number;
    workingDays?: string;
}
export declare class UpdateEmployeeDto {
    name?: string;
    email?: string;
    phone?: string;
    designation?: string;
    joiningDate?: string;
    dailySalary?: number;
    paidLeavesPerMonth?: number;
    workingDays?: string;
    isActive?: boolean;
}
