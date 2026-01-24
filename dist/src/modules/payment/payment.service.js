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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const database_config_1 = require("../../config/database.config");
let PaymentService = class PaymentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPaymentDto, userId) {
        const { accountId, projectId, ...paymentData } = createPaymentDto;
        const account = await this.prisma.account.findUnique({
            where: { id: accountId },
        });
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        const project = await this.prisma.project.findUnique({
            where: { id: projectId },
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        const payment = await this.prisma.payment.create({
            data: {
                ...paymentData,
                accountId,
                projectId,
                addedBy: userId,
            },
            include: {
                account: {
                    select: {
                        id: true,
                        accountName: true,
                        accountHolderName: true,
                    },
                },
                project: {
                    select: {
                        id: true,
                        title: true,
                        clientDetails: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        });
        await this.prisma.account.update({
            where: { id: accountId },
            data: {
                currentBalance: {
                    increment: createPaymentDto.amount,
                },
            },
        });
        return payment;
    }
    async findAll() {
        return this.prisma.payment.findMany({
            include: {
                account: {
                    select: {
                        id: true,
                        accountName: true,
                    },
                },
                project: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                paymentDate: 'desc',
            },
        });
    }
    async findOne(id) {
        const payment = await this.prisma.payment.findUnique({
            where: { id },
            include: {
                account: true,
                project: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        });
        if (!payment) {
            throw new common_1.NotFoundException('Payment not found');
        }
        return payment;
    }
    async findByProject(projectId) {
        return this.prisma.payment.findMany({
            where: { projectId },
            include: {
                account: {
                    select: {
                        id: true,
                        accountName: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                paymentDate: 'desc',
            },
        });
    }
    async findByAccount(accountId) {
        return this.prisma.payment.findMany({
            where: { accountId },
            include: {
                project: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                paymentDate: 'desc',
            },
        });
    }
    async update(id, updatePaymentDto) {
        const existingPayment = await this.findOne(id);
        const oldAmount = Number(existingPayment.amount);
        const newAmount = updatePaymentDto.amount || oldAmount;
        const amountDifference = newAmount - oldAmount;
        if (updatePaymentDto.accountId &&
            updatePaymentDto.accountId !== existingPayment.accountId) {
            const newAccount = await this.prisma.account.findUnique({
                where: { id: updatePaymentDto.accountId },
            });
            if (!newAccount) {
                throw new common_1.NotFoundException('New account not found');
            }
            await this.prisma.account.update({
                where: { id: existingPayment.accountId },
                data: {
                    currentBalance: {
                        decrement: oldAmount,
                    },
                },
            });
            await this.prisma.account.update({
                where: { id: updatePaymentDto.accountId },
                data: {
                    currentBalance: {
                        increment: newAmount,
                    },
                },
            });
        }
        else if (amountDifference !== 0) {
            await this.prisma.account.update({
                where: { id: existingPayment.accountId },
                data: {
                    currentBalance: {
                        increment: amountDifference,
                    },
                },
            });
        }
        const payment = await this.prisma.payment.update({
            where: { id },
            data: updatePaymentDto,
            include: {
                account: {
                    select: {
                        id: true,
                        accountName: true,
                    },
                },
                project: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },
        });
        return payment;
    }
    async remove(id) {
        const payment = await this.findOne(id);
        await this.prisma.account.update({
            where: { id: payment.accountId },
            data: {
                currentBalance: {
                    decrement: Number(payment.amount),
                },
            },
        });
        await this.prisma.payment.delete({
            where: { id },
        });
        return { message: 'Payment deleted successfully' };
    }
    async getProjectPaymentSummary(projectId) {
        const project = await this.prisma.project.findUnique({
            where: { id: projectId },
            include: {
                workPackages: true,
            },
        });
        if (!project) {
            throw new common_1.NotFoundException('Project not found');
        }
        const payments = await this.prisma.payment.aggregate({
            where: { projectId },
            _sum: {
                amount: true,
            },
        });
        const totalWorkPackageAmount = project.workPackages.reduce((sum, wp) => sum + Number(wp.amount), 0);
        const totalPaid = Number(payments._sum.amount || 0);
        const pendingAmount = totalWorkPackageAmount - totalPaid;
        return {
            projectId: project.id,
            projectTitle: project.title,
            totalWorkPackageAmount,
            totalPaid,
            pendingAmount,
            paymentPercentage: totalWorkPackageAmount > 0
                ? ((totalPaid / totalWorkPackageAmount) * 100).toFixed(2)
                : 0,
        };
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_config_1.PrismaService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map