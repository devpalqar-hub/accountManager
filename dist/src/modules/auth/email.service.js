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
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
let EmailService = EmailService_1 = class EmailService {
    configService;
    transporter;
    logger = new common_1.Logger(EmailService_1.name);
    constructor(configService) {
        this.configService = configService;
        try {
            this.transporter = nodemailer.createTransport({
                host: this.configService.get('SMTP_HOST'),
                port: this.configService.get('SMTP_PORT'),
                secure: this.configService.get('SMTP_SECURE'),
                auth: {
                    user: this.configService.get('SMTP_USER'),
                    pass: this.configService.get('SMTP_PASS'),
                },
            });
        }
        catch (error) {
            this.logger.warn('Failed to initialize SMTP transporter - will use fallback logging');
        }
    }
    async sendOTP(email, otp) {
        this.logger.log('═══════════════════════════════════════');
        this.logger.log(`📧 OTP for ${email}: ${otp}`);
        this.logger.log('═══════════════════════════════════════');
        try {
            if (this.transporter) {
                const mailOptions = {
                    from: this.configService.get('SMTP_FROM'),
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
        }
        catch (error) {
            this.logger.warn(`⚠️ Email sending failed: ${error.message}`);
            this.logger.log('💡 User can still login with OTP from console log');
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map