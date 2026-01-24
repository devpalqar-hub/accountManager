import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig = (
  configService: ConfigService,
): JwtModuleOptions => ({
  secret: configService.get<string>('JWT_SECRET') || 'default-secret',
  signOptions: {
    expiresIn: (configService.get<string>('JWT_EXPIRATION') || '7d') as any,
  },
});
