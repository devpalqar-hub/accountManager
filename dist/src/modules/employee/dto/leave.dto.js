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
exports.CreateCompensatoryLeaveDto = exports.UpdateLeaveDto = exports.CreateLeaveDto = exports.LeaveType = void 0;
const class_validator_1 = require("class-validator");
var LeaveType;
(function (LeaveType) {
    LeaveType["FULL_DAY"] = "FULL_DAY";
    LeaveType["HALF_DAY"] = "HALF_DAY";
})(LeaveType || (exports.LeaveType = LeaveType = {}));
class CreateLeaveDto {
    employeeId;
    leaveDate;
    leaveType;
    reason;
    isCompensatory;
    compensatoryReason;
}
exports.CreateLeaveDto = CreateLeaveDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeaveDto.prototype, "employeeId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateLeaveDto.prototype, "leaveDate", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(LeaveType),
    __metadata("design:type", String)
], CreateLeaveDto.prototype, "leaveType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeaveDto.prototype, "reason", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateLeaveDto.prototype, "isCompensatory", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeaveDto.prototype, "compensatoryReason", void 0);
class UpdateLeaveDto {
    leaveDate;
    leaveType;
    reason;
    isCompensatory;
    compensatoryReason;
}
exports.UpdateLeaveDto = UpdateLeaveDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateLeaveDto.prototype, "leaveDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(LeaveType),
    __metadata("design:type", String)
], UpdateLeaveDto.prototype, "leaveType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLeaveDto.prototype, "reason", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateLeaveDto.prototype, "isCompensatory", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateLeaveDto.prototype, "compensatoryReason", void 0);
class CreateCompensatoryLeaveDto {
    employeeId;
    reason;
    expiryDate;
}
exports.CreateCompensatoryLeaveDto = CreateCompensatoryLeaveDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCompensatoryLeaveDto.prototype, "employeeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCompensatoryLeaveDto.prototype, "reason", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateCompensatoryLeaveDto.prototype, "expiryDate", void 0);
//# sourceMappingURL=leave.dto.js.map