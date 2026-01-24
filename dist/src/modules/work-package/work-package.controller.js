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
exports.WorkPackageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const work_package_service_1 = require("./work-package.service");
const work_package_dto_1 = require("./dto/work-package.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let WorkPackageController = class WorkPackageController {
    workPackageService;
    constructor(workPackageService) {
        this.workPackageService = workPackageService;
    }
    create(createWorkPackageDto) {
        return this.workPackageService.create(createWorkPackageDto);
    }
    findAll() {
        return this.workPackageService.findAll();
    }
    findByProject(projectId) {
        return this.workPackageService.findByProject(projectId);
    }
    getStats(projectId) {
        return this.workPackageService.getWorkPackageStats(projectId);
    }
    findOne(id) {
        return this.workPackageService.findOne(id);
    }
    update(id, updateWorkPackageDto) {
        return this.workPackageService.update(id, updateWorkPackageDto);
    }
    remove(id) {
        return this.workPackageService.remove(id);
    }
};
exports.WorkPackageController = WorkPackageController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new work package' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Work package created successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Project not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [work_package_dto_1.CreateWorkPackageDto]),
    __metadata("design:returntype", void 0)
], WorkPackageController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all work packages' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Work packages retrieved successfully',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WorkPackageController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('project/:projectId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all work packages for a project' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Work packages retrieved successfully',
    }),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkPackageController.prototype, "findByProject", null);
__decorate([
    (0, common_1.Get)('project/:projectId/stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get work package statistics for a project' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Statistics retrieved successfully' }),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkPackageController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get work package by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Work package retrieved successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Work package not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkPackageController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update work package' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Work package updated successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Work package not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, work_package_dto_1.UpdateWorkPackageDto]),
    __metadata("design:returntype", void 0)
], WorkPackageController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete work package' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Work package deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Work package not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkPackageController.prototype, "remove", null);
exports.WorkPackageController = WorkPackageController = __decorate([
    (0, swagger_1.ApiTags)('Work Packages'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('work-packages'),
    __metadata("design:paramtypes", [work_package_service_1.WorkPackageService])
], WorkPackageController);
//# sourceMappingURL=work-package.controller.js.map