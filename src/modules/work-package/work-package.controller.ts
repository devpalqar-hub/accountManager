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
import { WorkPackageService } from './work-package.service';
import {
  CreateWorkPackageDto,
  UpdateWorkPackageDto,
} from './dto/work-package.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Work Packages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('work-packages')
export class WorkPackageController {
  constructor(private readonly workPackageService: WorkPackageService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new work package' })
  @ApiResponse({
    status: 201,
    description: 'Work package created successfully',
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createWorkPackageDto: CreateWorkPackageDto) {
    return this.workPackageService.create(createWorkPackageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all work packages' })
  @ApiResponse({
    status: 200,
    description: 'Work packages retrieved successfully',
  })
  findAll() {
    return this.workPackageService.findAll();
  }

  @Get('project/:projectId')
  @ApiOperation({ summary: 'Get all work packages for a project' })
  @ApiResponse({
    status: 200,
    description: 'Work packages retrieved successfully',
  })
  findByProject(@Param('projectId') projectId: string) {
    return this.workPackageService.findByProject(projectId);
  }

  @Get('project/:projectId/stats')
  @ApiOperation({ summary: 'Get work package statistics for a project' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  getStats(@Param('projectId') projectId: string) {
    return this.workPackageService.getWorkPackageStats(projectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get work package by ID' })
  @ApiResponse({
    status: 200,
    description: 'Work package retrieved successfully',
  })
  @ApiResponse({ status: 404, description: 'Work package not found' })
  findOne(@Param('id') id: string) {
    return this.workPackageService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update work package' })
  @ApiResponse({
    status: 200,
    description: 'Work package updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Work package not found' })
  update(
    @Param('id') id: string,
    @Body() updateWorkPackageDto: UpdateWorkPackageDto,
  ) {
    return this.workPackageService.update(id, updateWorkPackageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete work package' })
  @ApiResponse({
    status: 200,
    description: 'Work package deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Work package not found' })
  remove(@Param('id') id: string) {
    return this.workPackageService.remove(id);
  }
}
