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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("./employee.service");
const employee_dto_1 = require("./dto/employee.dto");
const leave_dto_1 = require("./dto/leave.dto");
const salary_dto_1 = require("./dto/salary.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let EmployeeController = class EmployeeController {
    employeeService;
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    create(createEmployeeDto) {
        return this.employeeService.create(createEmployeeDto);
    }
    findAll() {
        return this.employeeService.findAll();
    }
    findOne(id) {
        return this.employeeService.findOne(id);
    }
    update(id, updateEmployeeDto) {
        return this.employeeService.update(id, updateEmployeeDto);
    }
    remove(id) {
        return this.employeeService.remove(id);
    }
    createLeave(createLeaveDto) {
        return this.employeeService.createLeave(createLeaveDto);
    }
    findLeaves(employeeId, month, year) {
        return this.employeeService.findLeavesByEmployee(employeeId, month ? parseInt(month) : undefined, year ? parseInt(year) : undefined);
    }
    updateLeave(id, updateLeaveDto) {
        return this.employeeService.updateLeave(id, updateLeaveDto);
    }
    removeLeave(id) {
        return this.employeeService.removeLeave(id);
    }
    createCompensatoryLeave(createCompLeaveDto) {
        return this.employeeService.createCompensatoryLeave(createCompLeaveDto);
    }
    findCompensatoryLeaves(employeeId) {
        return this.employeeService.findCompensatoryLeaves(employeeId);
    }
    removeCompensatoryLeave(id) {
        return this.employeeService.removeCompensatoryLeave(id);
    }
    calculateSalary(calculateSalaryDto) {
        return this.employeeService.calculateSalary(calculateSalaryDto);
    }
    processSalary(processSalaryDto) {
        return this.employeeService.processSalary(processSalaryDto);
    }
    findSalaryRecords(employeeId, year) {
        return this.employeeService.findSalaryRecords(employeeId, year ? parseInt(year) : undefined);
    }
    findSalaryRecord(id) {
        return this.employeeService.findSalaryRecord(id);
    }
    updateSalaryRecord(id, updateDto) {
        return this.employeeService.updateSalaryRecord(id, updateDto);
    }
};
exports.EmployeeController = EmployeeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_dto_1.CreateEmployeeDto]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, employee_dto_1.UpdateEmployeeDto]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('leaves'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [leave_dto_1.CreateLeaveDto]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "createLeave", null);
__decorate([
    (0, common_1.Get)(':employeeId/leaves'),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "findLeaves", null);
__decorate([
    (0, common_1.Patch)('leaves/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, leave_dto_1.UpdateLeaveDto]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "updateLeave", null);
__decorate([
    (0, common_1.Delete)('leaves/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "removeLeave", null);
__decorate([
    (0, common_1.Post)('compensatory-leaves'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [leave_dto_1.CreateCompensatoryLeaveDto]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "createCompensatoryLeave", null);
__decorate([
    (0, common_1.Get)(':employeeId/compensatory-leaves'),
    __param(0, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "findCompensatoryLeaves", null);
__decorate([
    (0, common_1.Delete)('compensatory-leaves/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "removeCompensatoryLeave", null);
__decorate([
    (0, common_1.Post)('salary/calculate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [salary_dto_1.CalculateSalaryDto]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "calculateSalary", null);
__decorate([
    (0, common_1.Post)('salary/process'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [salary_dto_1.ProcessSalaryDto]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "processSalary", null);
__decorate([
    (0, common_1.Get)('salary/records'),
    __param(0, (0, common_1.Query)('employeeId')),
    __param(1, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "findSalaryRecords", null);
__decorate([
    (0, common_1.Get)('salary/records/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "findSalaryRecord", null);
__decorate([
    (0, common_1.Patch)('salary/records/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, salary_dto_1.UpdateSalaryRecordDto]),
    __metadata("design:returntype", void 0)
], EmployeeController.prototype, "updateSalaryRecord", null);
exports.EmployeeController = EmployeeController = __decorate([
    (0, common_1.Controller)('employees'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeeController);
//# sourceMappingURL=employee.controller.js.map