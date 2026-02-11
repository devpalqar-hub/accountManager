import { AuthService } from './auth.service';
import { SendOtpDto, VerifyOtpDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
}
