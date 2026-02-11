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
exports.ExpenseController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const expense_service_1 = require("./expense.service");
const expense_dto_1 = require("./dto/expense.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let ExpenseController = class ExpenseController {
    expenseService;
    constructor(expenseService) {
        this.expenseService = expenseService;
    }
    create(createExpenseDto, user) {
        const userId = user?.id || user?.sub;
        return this.expenseService.create(createExpenseDto, userId);
    }
    findAll() {
        return this.expenseService.findAll();
    }
    findByProject(projectId) {
        return this.expenseService.findByProject(projectId);
    }
    findByAccount(accountId) {
        return this.expenseService.findByAccount(accountId);
    }
    getTotalByProject(projectId) {
        return this.expenseService.getTotalByProject(projectId);
    }
    getTotalByAccount(accountId) {
        return this.expenseService.getTotalByAccount(accountId);
    }
    findOne(id) {
        return this.expenseService.findOne(id);
    }
    update(id, updateExpenseDto) {
        return this.expenseService.update(id, updateExpenseDto);
    }
    remove(id) {
        return this.expenseService.remove(id);
    }
};
exports.ExpenseController = ExpenseController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new expense' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Expense created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Account or Project not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [expense_dto_1.CreateExpenseDto, Object]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all expenses' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Expenses retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('project/:projectId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all expenses for a project' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Expenses retrieved successfully' }),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "findByProject", null);
__decorate([
    (0, common_1.Get)('account/:accountId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all expenses for an account' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Expenses retrieved successfully' }),
    __param(0, (0, common_1.Param)('accountId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "findByAccount", null);
__decorate([
    (0, common_1.Get)('project/:projectId/total'),
    (0, swagger_1.ApiOperation)({ summary: 'Get total expenses for a project' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Total retrieved successfully' }),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "getTotalByProject", null);
__decorate([
    (0, common_1.Get)('account/:accountId/total'),
    (0, swagger_1.ApiOperation)({ summary: 'Get total expenses for an account' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Total retrieved successfully' }),
    __param(0, (0, common_1.Param)('accountId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "getTotalByAccount", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get expense by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Expense retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Expense not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update expense' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Expense updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Expense not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, expense_dto_1.UpdateExpenseDto]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete expense' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Expense deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Expense not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExpenseController.prototype, "remove", null);
exports.ExpenseController = ExpenseController = __decorate([
    (0, swagger_1.ApiTags)('Expenses'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('expenses'),
    __metadata("design:paramtypes", [expense_service_1.ExpenseService])
], ExpenseController);
//# sourceMappingURL=expense.controller.js.map