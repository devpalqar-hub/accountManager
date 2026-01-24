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
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const analytics_service_1 = require("./analytics.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let AnalyticsController = class AnalyticsController {
    analyticsService;
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    getDashboard() {
        return this.analyticsService.getDashboardOverview();
    }
    getProjectAnalytics() {
        return this.analyticsService.getProjectAnalytics();
    }
    getFinancialAnalytics(startDate, endDate) {
        return this.analyticsService.getFinancialAnalytics(startDate, endDate);
    }
    getWorkPackageAnalytics() {
        return this.analyticsService.getWorkPackageAnalytics();
    }
    getMonthlyReport(year, month) {
        return this.analyticsService.getMonthlyReport(parseInt(year), parseInt(month));
    }
    getYearlyReport(year) {
        return this.analyticsService.getYearlyReport(parseInt(year));
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Get dashboard overview analytics' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dashboard overview retrieved successfully',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('projects'),
    (0, swagger_1.ApiOperation)({ summary: 'Get project analytics' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Project analytics retrieved successfully',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getProjectAnalytics", null);
__decorate([
    (0, common_1.Get)('financial'),
    (0, swagger_1.ApiOperation)({ summary: 'Get financial analytics' }),
    (0, swagger_1.ApiQuery)({
        name: 'startDate',
        required: false,
        type: String,
        example: '2026-01-01',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'endDate',
        required: false,
        type: String,
        example: '2026-12-31',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Financial analytics retrieved successfully',
    }),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getFinancialAnalytics", null);
__decorate([
    (0, common_1.Get)('work-packages'),
    (0, swagger_1.ApiOperation)({ summary: 'Get work package analytics' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Work package analytics retrieved successfully',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getWorkPackageAnalytics", null);
__decorate([
    (0, common_1.Get)('reports/monthly'),
    (0, swagger_1.ApiOperation)({ summary: 'Get monthly report' }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: true, type: Number, example: 2026 }),
    (0, swagger_1.ApiQuery)({ name: 'month', required: true, type: Number, example: 1 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Monthly report retrieved successfully' }),
    __param(0, (0, common_1.Query)('year')),
    __param(1, (0, common_1.Query)('month')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getMonthlyReport", null);
__decorate([
    (0, common_1.Get)('reports/yearly'),
    (0, swagger_1.ApiOperation)({ summary: 'Get yearly report' }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: true, type: Number, example: 2026 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Yearly report retrieved successfully' }),
    __param(0, (0, common_1.Query)('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnalyticsController.prototype, "getYearlyReport", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, swagger_1.ApiTags)('Analytics'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('analytics'),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
], AnalyticsController);
//# sourceMappingURL=analytics.controller.js.map