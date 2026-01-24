"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
const jwtConfig = (configService) => ({
    secret: configService.get('JWT_SECRET') || 'default-secret',
    signOptions: {
        expiresIn: (configService.get('JWT_EXPIRATION') || '7d'),
    },
});
exports.jwtConfig = jwtConfig;
//# sourceMappingURL=jwt.config.js.map