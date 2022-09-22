import { createVoucher, applyVoucher, changeVoucherToUsed, isAmountValidForDiscount, applyDiscount } from "../../src/services/voucherService";
import * as voucherRepository from "../../src/repositories/voucherRepository";
import * as errorMiddleware from "../../src/middlewares/errorHandlerMiddleware";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "Voucher";`;
});


afterAll(async () => {
    await prisma.$disconnect();
});

function generateBody() {
    return {
        code: '2233',
        discount: 5
    }
}
describe('Testing createVoucher function', async () => {
    it.todo('Should call the function of the repository that creates the new voucher',async()=>{
        
    });
    it.todo('');
    it.todo('');
    it.todo('');
    it.todo('');
    it.todo('');
})