import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../config/database.config';
import { EmailService } from './email.service';
import { SendOtpDto, VerifyOtpDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private otpStorage = new Map<string, { otp: string; timestamp: number }>();

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  async sendOtp(sendOtpDto: SendOtpDto) {
    const { email } = sendOtpDto;

    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User account is inactive');
    }

    // Use default OTP
    const otp = this.configService.get<string>('DEFAULT_OTP') || '759409';

    // Store OTP with timestamp
    this.otpStorage.set(email, {
      otp,
      timestamp: Date.now(),
    });

    // Send OTP via email
    await this.emailService.sendOTP(email, otp);

    return {
      message: 'OTP sent successfully to your email',
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { email, otp } = verifyOtpDto;

    // Get stored OTP
    const storedData = this.otpStorage.get(email);

    if (!storedData) {
      throw new UnauthorizedException('OTP not found or expired');
    }

    // Check if OTP is expired (10 minutes)
    const otpAge = Date.now() - storedData.timestamp;
    if (otpAge > 10 * 60 * 1000) {
      this.otpStorage.delete(email);
      throw new UnauthorizedException('OTP has expired');
    }

    // Verify OTP
    if (storedData.otp !== otp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    // Remove used OTP
    this.otpStorage.delete(email);

    // Get user
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Generate JWT token
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

  async validateUser(userId: string) {
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
}
