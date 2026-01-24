export declare enum WorkPackageStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    ON_HOLD = "ON_HOLD"
}
export declare class CreateWorkPackageDto {
    workPackageName: string;
    amount: number;
    projectId: string;
    version?: string;
    startDate?: string;
    completionDate?: string;
    advanceAmount?: number;
    miscellaneousAmount?: number;
    ongoingCost?: number;
    status?: WorkPackageStatus;
    description?: string;
}
export declare class UpdateWorkPackageDto {
    workPackageName?: string;
    amount?: number;
    version?: string;
    startDate?: string;
    completionDate?: string;
    advanceAmount?: number;
    miscellaneousAmount?: number;
    ongoingCost?: number;
    status?: WorkPackageStatus;
    description?: string;
}
