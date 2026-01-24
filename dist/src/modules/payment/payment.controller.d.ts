import { PaymentService } from './payment.service';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/payment.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    create(createPaymentDto: CreatePaymentDto, user: any): Promise<any>;
    findAll(): Promise<any>;
    findByProject(projectId: string): Promise<any>;
    getProjectSummary(projectId: string): Promise<{
        projectId: any;
        projectTitle: any;
        totalWorkPackageAmount: any;
        totalPaid: number;
        pendingAmount: number;
        paymentPercentage: string | number;
    }>;
    findByAccount(accountId: string): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
