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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const database_config_1 = require("../../config/database.config");
const email_service_1 = require("./email.service");
let AuthService = class AuthService {
    prisma;
    jwtService;
    emailService;
    configService;
    otpStorage = new Map();
    constructor(prisma, jwtService, emailService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.configService = configService;
    }
    async sendOtp(sendOtpDto) {
        const { email } = sendOtpDto;
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('User account is inactive');
        }
        const otp = this.configService.get('DEFAULT_OTP') || '759409';
        this.otpStorage.set(email, {
            otp,
            timestamp: Date.now(),
        });
        await this.emailService.sendOTP(email, otp);
        return {
            message: 'OTP sent successfully to your email',
        };
    }
    async verifyOtp(verifyOtpDto) {
        const { email, otp } = verifyOtpDto;
        const storedData = this.otpStorage.get(email);
        if (!storedData) {
            throw new common_1.UnauthorizedException('OTP not found or expired');
        }
        const otpAge = Date.now() - storedData.timestamp;
        if (otpAge > 10 * 60 * 1000) {
            this.otpStorage.delete(email);
            throw new common_1.UnauthorizedException('OTP has expired');
        }
        if (storedData.otp !== otp) {
            throw new common_1.UnauthorizedException('Invalid OTP');
        }
        this.otpStorage.delete(email);
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        const accessToken = this.jwtService.sign(payload);
        return {
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        };
    }
    async validateUser(userId) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                role: true,
                isActive: true,
            },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_config_1.PrismaService,
        jwt_1.JwtService,
        email_service_1.EmailService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map