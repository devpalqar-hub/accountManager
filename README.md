# PalqarAccount Backend

A scalable NestJS backend with MySQL, Prisma ORM, JWT authentication, and Swagger documentation.

## Features

- **NestJS Framework**: Modular and scalable architecture
- **MySQL Database**: Reliable relational database
- **Prisma ORM**: Type-safe database access
- **JWT Authentication**: Secure token-based authentication with OTP email login
- **Swagger Documentation**: Interactive API documentation
- **Email Service**: SMTP-based OTP delivery

## Prerequisites

- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm

## Environment Setup

Update the `.env` file with your configuration:

```env
DATABASE_URL="mysql://root:password@localhost:3306/palqar_account"
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRATION="7d"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
DEFAULT_OTP="759409"
```

## Installation

```bash
npm install
```

## Database Setup

1. Create MySQL database:
```bash
mysql -u root -p
CREATE DATABASE palqar_account;
```

2. Run migrations (when ready):
```bash
npx prisma migrate dev --name init
npx prisma generate
```

## Running the Application

```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

## API Documentation

Swagger: `http://localhost:3000/api/docs`

## Authentication Flow

1. **Send OTP**: POST `/auth/send-otp` with email
2. **Verify OTP**: POST `/auth/verify-otp` with email and OTP (759409)
3. **Use Token**: Include JWT in Authorization header

## Project Structure

```
src/
├── modules/          # Feature modules
│   ├── auth/        # Authentication
│   └── user/        # User management
├── common/          # Shared utilities
└── config/          # Configuration
```
# accountManager
