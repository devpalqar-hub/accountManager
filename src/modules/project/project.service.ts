import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../config/database.config';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto, userId: string) {
    if (!userId) {
      throw new NotFoundException('User ID is required');
    }

    // Convert date strings to ISO-8601 DateTime format
    const data: any = {
      ...createProjectDto,
      createdBy: userId,
    };

    // Handle date conversion - if date is in YYYY-MM-DD format, convert to ISO-8601
    if (data.startDate && !data.startDate.includes('T')) {
      data.startDate = new Date(data.startDate).toISOString();
    }
    if (data.endDate && !data.endDate.includes('T')) {
      data.endDate = new Date(data.endDate).toISOString();
    }

    const project = await this.prisma.project.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    return project;
  }

  async findAll() {
    return this.prisma.project.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    await this.findOne(id); // Check if project exists

    // Convert date strings to ISO-8601 DateTime format
    const data: any = { ...updateProjectDto };

    // Handle date conversion - if date is in YYYY-MM-DD format, convert to ISO-8601
    if (data.startDate && !data.startDate.includes('T')) {
      data.startDate = new Date(data.startDate).toISOString();
    }
    if (data.endDate && !data.endDate.includes('T')) {
      data.endDate = new Date(data.endDate).toISOString();
    }

    const project = await this.prisma.project.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    return project;
  }

  async remove(id: string) {
    await this.findOne(id); // Check if project exists

    await this.prisma.project.delete({
      where: { id },
    });

    return { message: 'Project deleted successfully' };
  }

  async findByUser(userId: string) {
    return this.prisma.project.findMany({
      where: {
        createdBy: userId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
