import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../config/database.config';
import { EmailService } from './email.service';
import { SendOtpDto, VerifyOtpDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private emailService;
    private configService;
    private otpStorage;
    constructor(prisma: PrismaService, jwtService: JwtService, emailService: EmailService, configService: ConfigService);
    sendOtp(sendOtpDto: SendOtpDto): Promise<{
        message: string;
    }>;
    verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            role: "ADMIN";
        };
    }>;
    validateUser(userId: string): Promise<{
        email: string;
        id: string;
        role: "ADMIN";
        isActive: boolean;
    } | null>;
}
