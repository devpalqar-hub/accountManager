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
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const database_config_1 = require("../../config/database.config");
let AccountService = class AccountService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAccountDto) {
        const { openingBalance, ...accountData } = createAccountDto;
        const account = await this.prisma.account.create({
            data: {
                ...accountData,
                openingBalance: openingBalance || 0,
                currentBalance: openingBalance || 0,
            },
        });
        return account;
    }
    async findAll() {
        return this.prisma.account.findMany({
            include: {
                _count: {
                    select: {
                        payments: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findOne(id) {
        const account = await this.prisma.account.findUnique({
            where: { id },
            include: {
                payments: {
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
                    take: 10,
                },
                _count: {
                    select: {
                        payments: true,
                    },
                },
            },
        });
        if (!account) {
            throw new common_1.NotFoundException('Account not found');
        }
        return account;
    }
    async update(id, updateAccountDto) {
        await this.findOne(id);
        const account = await this.prisma.account.update({
            where: { id },
            data: updateAccountDto,
        });
        return account;
    }
    async remove(id) {
        await this.findOne(id);
        const paymentsCount = await this.prisma.payment.count({
            where: { accountId: id },
        });
        if (paymentsCount > 0) {
            throw new Error('Cannot delete account with existing payments. Please delete payments first.');
        }
        await this.prisma.account.delete({
            where: { id },
        });
        return { message: 'Account deleted successfully' };
    }
    async getAccountBalance(id) {
        const account = await this.findOne(id);
        const totalCredits = await this.prisma.payment.aggregate({
            where: { accountId: id },
            _sum: {
                amount: true,
            },
        });
        return {
            accountId: account.id,
            accountName: account.accountName,
            openingBalance: account.openingBalance,
            totalCredits: totalCredits._sum.amount || 0,
            currentBalance: account.currentBalance,
        };
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_config_1.PrismaService])
], AccountService);
//# sourceMappingURL=account.service.js.map