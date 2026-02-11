export declare enum LeaveType {
    FULL_DAY = "FULL_DAY",
    HALF_DAY = "HALF_DAY"
}
export declare class CreateLeaveDto {
    employeeId: string;
    leaveDate: string;
    leaveType: LeaveType;
    reason: string;
    isCompensatory?: boolean;
    compensatoryReason?: string;
}
export declare class UpdateLeaveDto {
    leaveDate?: string;
    leaveType?: LeaveType;
    reason?: string;
    isCompensatory?: boolean;
    compensatoryReason?: string;
}
export declare class CreateCompensatoryLeaveDto {
    employeeId: string;
    reason: string;
    expiryDate: string;
}
