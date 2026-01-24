import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Analytics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard overview analytics' })
  @ApiResponse({
    status: 200,
    description: 'Dashboard overview retrieved successfully',
  })
  getDashboard() {
    return this.analyticsService.getDashboardOverview();
  }

  @Get('projects')
  @ApiOperation({ summary: 'Get project analytics' })
  @ApiResponse({
    status: 200,
    description: 'Project analytics retrieved successfully',
  })
  getProjectAnalytics() {
    return this.analyticsService.getProjectAnalytics();
  }

  @Get('financial')
  @ApiOperation({ summary: 'Get financial analytics' })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    example: '2026-01-01',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
    example: '2026-12-31',
  })
  @ApiResponse({
    status: 200,
    description: 'Financial analytics retrieved successfully',
  })
  getFinancialAnalytics(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.analyticsService.getFinancialAnalytics(startDate, endDate);
  }

  @Get('work-packages')
  @ApiOperation({ summary: 'Get work package analytics' })
  @ApiResponse({
    status: 200,
    description: 'Work package analytics retrieved successfully',
  })
  getWorkPackageAnalytics() {
    return this.analyticsService.getWorkPackageAnalytics();
  }

  @Get('reports/monthly')
  @ApiOperation({ summary: 'Get monthly report' })
  @ApiQuery({ name: 'year', required: true, type: Number, example: 2026 })
  @ApiQuery({ name: 'month', required: true, type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Monthly report retrieved successfully' })
  getMonthlyReport(
    @Query('year') year: string,
    @Query('month') month: string,
  ) {
    return this.analyticsService.getMonthlyReport(
      parseInt(year),
      parseInt(month),
    );
  }

  @Get('reports/yearly')
  @ApiOperation({ summary: 'Get yearly report' })
  @ApiQuery({ name: 'year', required: true, type: Number, example: 2026 })
  @ApiResponse({ status: 200, description: 'Yearly report retrieved successfully' })
  getYearlyReport(@Query('year') year: string) {
    return this.analyticsService.getYearlyReport(parseInt(year));
  }
}
