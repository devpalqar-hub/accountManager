"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWorkPackageDto = exports.CreateWorkPackageDto = exports.WorkPackageStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var WorkPackageStatus;
(function (WorkPackageStatus) {
    WorkPackageStatus["PENDING"] = "PENDING";
    WorkPackageStatus["IN_PROGRESS"] = "IN_PROGRESS";
    WorkPackageStatus["COMPLETED"] = "COMPLETED";
    WorkPackageStatus["ON_HOLD"] = "ON_HOLD";
})(WorkPackageStatus || (exports.WorkPackageStatus = WorkPackageStatus = {}));
class CreateWorkPackageDto {
    workPackageName;
    amount;
    projectId;
    version;
    startDate;
    completionDate;
    advanceAmount;
    miscellaneousAmount;
    ongoingCost;
    status;
    description;
}
exports.CreateWorkPackageDto = CreateWorkPackageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Phase 1 - Foundation Development' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWorkPackageDto.prototype, "workPackageName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25000.0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateWorkPackageDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'project-uuid-here' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWorkPackageDto.prototype, "projectId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1.0' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWorkPackageDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-02-01T00:00:00.000Z' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWorkPackageDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-03-31T00:00:00.000Z' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWorkPackageDto.prototype, "completionDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10000.0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateWorkPackageDto.prototype, "advanceAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2000.0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateWorkPackageDto.prototype, "miscellaneousAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5000.0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateWorkPackageDto.prototype, "ongoingCost", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: WorkPackageStatus, example: 'PENDING' }),
    (0, class_validator_1.IsEnum)(WorkPackageStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWorkPackageDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Initial development phase including backend setup',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWorkPackageDto.prototype, "description", void 0);
class UpdateWorkPackageDto {
    workPackageName;
    amount;
    version;
    startDate;
    completionDate;
    advanceAmount;
    miscellaneousAmount;
    ongoingCost;
    status;
    description;
}
exports.UpdateWorkPackageDto = UpdateWorkPackageDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Phase 1 - Foundation Development' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWorkPackageDto.prototype, "workPackageName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 25000.0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateWorkPackageDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1.0' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWorkPackageDto.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-02-01T00:00:00.000Z' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWorkPackageDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2026-03-31T00:00:00.000Z' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWorkPackageDto.prototype, "completionDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10000.0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateWorkPackageDto.prototype, "advanceAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2000.0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateWorkPackageDto.prototype, "miscellaneousAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5000.0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateWorkPackageDto.prototype, "ongoingCost", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: WorkPackageStatus, example: 'IN_PROGRESS' }),
    (0, class_validator_1.IsEnum)(WorkPackageStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWorkPackageDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Initial development phase including backend setup',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWorkPackageDto.prototype, "description", void 0);
//# sourceMappingURL=work-package.dto.js.map