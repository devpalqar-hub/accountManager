import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto, UpdateExpenseDto } from './dto/expense.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Expenses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new expense' })
  @ApiResponse({ status: 201, description: 'Expense created successfully' })
  @ApiResponse({ status: 404, description: 'Account or Project not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createExpenseDto: CreateExpenseDto, @CurrentUser() user: any) {
    const userId = user?.id || user?.sub;
    return this.expenseService.create(createExpenseDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all expenses' })
  @ApiResponse({ status: 200, description: 'Expenses retrieved successfully' })
  findAll() {
    return this.expenseService.findAll();
  }

  @Get('project/:projectId')
  @ApiOperation({ summary: 'Get all expenses for a project' })
  @ApiResponse({ status: 200, description: 'Expenses retrieved successfully' })
  findByProject(@Param('projectId') projectId: string) {
    return this.expenseService.findByProject(projectId);
  }

  @Get('account/:accountId')
  @ApiOperation({ summary: 'Get all expenses for an account' })
  @ApiResponse({ status: 200, description: 'Expenses retrieved successfully' })
  findByAccount(@Param('accountId') accountId: string) {
    return this.expenseService.findByAccount(accountId);
  }

  @Get('project/:projectId/total')
  @ApiOperation({ summary: 'Get total expenses for a project' })
  @ApiResponse({ status: 200, description: 'Total retrieved successfully' })
  getTotalByProject(@Param('projectId') projectId: string) {
    return this.expenseService.getTotalByProject(projectId);
  }

  @Get('account/:accountId/total')
  @ApiOperation({ summary: 'Get total expenses for an account' })
  @ApiResponse({ status: 200, description: 'Total retrieved successfully' })
  getTotalByAccount(@Param('accountId') accountId: string) {
    return this.expenseService.getTotalByAccount(accountId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get expense by ID' })
  @ApiResponse({ status: 200, description: 'Expense retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update expense' })
  @ApiResponse({ status: 200, description: 'Expense updated successfully' })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete expense' })
  @ApiResponse({ status: 200, description: 'Expense deleted successfully' })
  @ApiResponse({ status: 404, description: 'Expense not found' })
  remove(@Param('id') id: string) {
    return this.expenseService.remove(id);
  }
}
