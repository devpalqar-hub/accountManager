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
exports.WorkPackageService = void 0;
const common_1 = require("@nestjs/common");
const database_config_1 = require("../../config/database.config");
let WorkPackageService = class WorkPackageService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createWorkPackageDto) {
        const project = await this.prisma.project.findUnique({
            where: { id: createWorkPackageDto.projectId },
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        const data = { ...createWorkPackageDto };
        if (data.startDate && !data.startDate.includes('T')) {
            data.startDate = new Date(data.startDate).toISOString();
        }
        if (data.completionDate && !data.completionDate.includes('T')) {
            data.completionDate = new Date(data.completionDate).toISOString();
        }
        const workPackage = await this.prisma.workPackage.create({
            data,
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
    async findOne(id) {
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
            throw new common_1.NotFoundException('Work package not found');
        }
        return workPackage;
    }
    async findByProject(projectId) {
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
    async update(id, updateWorkPackageDto) {
        await this.findOne(id);
        const data = { ...updateWorkPackageDto };
        if (data.startDate && !data.startDate.includes('T')) {
            data.startDate = new Date(data.startDate).toISOString();
        }
        if (data.completionDate && !data.completionDate.includes('T')) {
            data.completionDate = new Date(data.completionDate).toISOString();
        }
        const workPackage = await this.prisma.workPackage.update({
            where: { id },
            data,
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
    async remove(id) {
        await this.findOne(id);
        await this.prisma.workPackage.delete({
            where: { id },
        });
        return { message: 'Work package deleted successfully' };
    }
    async getWorkPackageStats(projectId) {
        const workPackages = await this.prisma.workPackage.findMany({
            where: { projectId },
        });
        const totalAmount = workPackages.reduce((sum, wp) => sum + Number(wp.amount), 0);
        const totalAdvance = workPackages.reduce((sum, wp) => sum + Number(wp.advanceAmount || 0), 0);
        const totalMiscellaneous = workPackages.reduce((sum, wp) => sum + Number(wp.miscellaneousAmount || 0), 0);
        const totalOngoingCost = workPackages.reduce((sum, wp) => sum + Number(wp.ongoingCost || 0), 0);
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
};
exports.WorkPackageService = WorkPackageService;
exports.WorkPackageService = WorkPackageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_config_1.PrismaService])
], WorkPackageService);
//# sourceMappingURL=work-package.service.js.map