import { createVoucher, applyDiscount, changeVoucherToUsed, isAmountValidForDiscount, applyVoucher } from "../../src/services/voucherService"
import voucherRepository from "../../src/repositories/voucherRepository";
import errorMiddleware from "../../src/middlewares/errorHandlerMiddleware";
import prisma from "../../src/config/database";
import { jest } from '@jest/globals';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "vouchers";`;
    jest.resetAllMocks();
    jest.clearAllMocks();
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
describe('Testing createVoucher function', () => {
    it('Should call the function of the repository that creates the new voucher', async () => {
        const info = generateBody();

        jest.spyOn(voucherRepository, 'getVoucherByCode').mockImplementationOnce((): any => { return false })
        jest.spyOn(voucherRepository, 'createVoucher').mockImplementationOnce((): any => { })
        await createVoucher(info.code, info.discount);

        expect(voucherRepository.getVoucherByCode).toBeCalled();
        expect(voucherRepository.createVoucher).toBeCalled();
    });
    it('Should call the error function when the voucher already exists', async () => {
        const info = generateBody();

        jest
            .spyOn(voucherRepository, 'getVoucherByCode')
            .mockImplementationOnce((): any => {
                return {
                    info
                };
            });

        const promise = createVoucher(info.code,info.discount);

        expect(promise).rejects.toEqual({
            type: 'conflict',
            message: 'Voucher already exist.'
        });

        expect(voucherRepository.createVoucher).not.toBeCalled();
    });
    it('Should return the correct value deducted of discount given the total amount and the percent of discount',async()=>{
        const amount = 100;
        const discount = 5;
        const valueWithDiscount = amount - (amount*(discount/100));

        const result = applyDiscount(amount,discount);

        expect(result).toBe(valueWithDiscount);
    });
    it('Should call the function useVoucher from repository', async ()=>{
        const code = 'aaa';
        const info = generateBody();
        jest.spyOn(voucherRepository,'useVoucher').mockImplementationOnce(():any=>{
            return info;
        })
        await changeVoucherToUsed(code);
        expect(voucherRepository.useVoucher).toBeCalled();
    });
    it.todo('');
    it.todo('');
    it.todo('');
})