import { PrismaService } from '../../config/database.config';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/payment.dto';
export declare class PaymentService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPaymentDto: CreatePaymentDto, userId: string): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    findByProject(projectId: string): Promise<any>;
    findByAccount(accountId: string): Promise<any>;
    update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getProjectPaymentSummary(projectId: string): Promise<{
        projectId: any;
        projectTitle: any;
        totalWorkPackageAmount: any;
        totalPaid: number;
        pendingAmount: number;
        paymentPercentage: string | number;
    }>;
}
