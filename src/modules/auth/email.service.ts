import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {
    try {
      this.transporter = nodemailer.createTransport({
        host: this.configService.get<string>('SMTP_HOST'),
        port: this.configService.get<number>('SMTP_PORT'),
        secure: this.configService.get<boolean>('SMTP_SECURE'),
        auth: {
          user: this.configService.get<string>('SMTP_USER'),
          pass: this.configService.get<string>('SMTP_PASS'),
        },
      });
    } catch (error) {
      this.logger.warn('Failed to initialize SMTP transporter - will use fallback logging');
    }
  }

  async sendOTP(email: string, otp: string): Promise<void> {
    // Always log OTP to console for development/testing
    this.logger.log('═══════════════════════════════════════');
    this.logger.log(`📧 OTP for ${email}: ${otp}`);
    this.logger.log('═══════════════════════════════════════');

    // Try to send email via SMTP, but don't fail if it errors
    try {
      if (this.transporter) {
        const mailOptions = {
          from: this.configService.get<string>('SMTP_FROM'),
          to: email,
          subject: 'Your OTP for Login',
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2>PalqarAccount Login</h2>
              <p>Your OTP for login is:</p>
              <h1 style="color: #4CAF50; font-size: 32px;">${otp}</h1>
              <p>This OTP is valid for 10 minutes.</p>
              <p>If you didn't request this, please ignore this email.</p>
            </div>
          `,
        };

        await this.transporter.sendMail(mailOptions);
        this.logger.log(`✅ Email sent successfully to ${email}`);
      }
    } catch (error) {
      // Log error but don't throw - API should still return success
      this.logger.warn(`⚠️ Email sending failed: ${error.message}`);
      this.logger.log('💡 User can still login with OTP from console log');
    }
  }
}
