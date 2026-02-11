import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';
import { WorkPackageModule } from './modules/work-package/work-package.module';
import { AccountModule } from './modules/account/account.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { TransactionLogModule } from './modules/transaction-log/transaction-log.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UserModule,
    ProjectModule,
    WorkPackageModule,
    AccountModule,
    PaymentModule,
    ExpenseModule,
    AnalyticsModule,
    EmployeeModule,
    TransactionLogModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
