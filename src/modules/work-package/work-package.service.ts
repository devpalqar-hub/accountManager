import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/database.config';
import {
  CreateWorkPackageDto,
  UpdateWorkPackageDto,
} from './dto/work-package.dto';

@Injectable()
export class WorkPackageService {
  constructor(private prisma: PrismaService) {}

  async create(createWorkPackageDto: CreateWorkPackageDto) {
    // Verify project exists
    const project = await this.prisma.project.findUnique({
      where: { id: createWorkPackageDto.projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const workPackage = await this.prisma.workPackage.create({
      data: createWorkPackageDto,
      include: {
        project: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return workPackage;
  }

  async findAll() {
    return this.prisma.workPackage.findMany({
      include: {
        project: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const workPackage = await this.prisma.workPackage.findUnique({
      where: { id },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            clientDetails: true,
          },
        },
      },
    });

    if (!workPackage) {
      throw new NotFoundException('Work package not found');
    }

    return workPackage;
  }

  async findByProject(projectId: string) {
    return this.prisma.workPackage.findMany({
      where: {
        projectId,
      },
      include: {
        project: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(id: string, updateWorkPackageDto: UpdateWorkPackageDto) {
    await this.findOne(id); // Check if work package exists

    const workPackage = await this.prisma.workPackage.update({
      where: { id },
      data: updateWorkPackageDto,
      include: {
        project: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return workPackage;
  }

  async remove(id: string) {
    await this.findOne(id); // Check if work package exists

    await this.prisma.workPackage.delete({
      where: { id },
    });

    return { message: 'Work package deleted successfully' };
  }

  async getWorkPackageStats(projectId: string) {
    const workPackages = await this.prisma.workPackage.findMany({
      where: { projectId },
    });

    const totalAmount = workPackages.reduce(
      (sum, wp) => sum + Number(wp.amount),
      0,
    );
    const totalAdvance = workPackages.reduce(
      (sum, wp) => sum + Number(wp.advanceAmount || 0),
      0,
    );
    const totalMiscellaneous = workPackages.reduce(
      (sum, wp) => sum + Number(wp.miscellaneousAmount || 0),
      0,
    );
    const totalOngoingCost = workPackages.reduce(
      (sum, wp) => sum + Number(wp.ongoingCost || 0),
      0,
    );

    return {
      totalWorkPackages: workPackages.length,
      totalAmount,
      totalAdvance,
      totalMiscellaneous,
      totalOngoingCost,
      balance: totalAmount - totalAdvance,
      statusBreakdown: {
        pending: workPackages.filter((wp) => wp.status === 'PENDING').length,
        inProgress: workPackages.filter((wp) => wp.status === 'IN_PROGRESS')
          .length,
        completed: workPackages.filter((wp) => wp.status === 'COMPLETED')
          .length,
        onHold: workPackages.filter((wp) => wp.status === 'ON_HOLD').length,
      },
    };
  }
}
