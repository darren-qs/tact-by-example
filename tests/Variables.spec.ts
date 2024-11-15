import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Variables } from '../wrappers/Variables';
import '@ton/test-utils';

describe('Variables', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let variables: SandboxContract<Variables>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        const initValue = BigInt(Math.floor(Math.random() * 100));

        variables = blockchain.openContract(await Variables.fromInit(initValue));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await variables.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: variables.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and variables are ready to use
    });

    it('should send the increment mssage to the varibales contract', async () => {
        const caller = await blockchain.treasury('caller');
        const incrementResult = await variables.send(
            caller.getSender(),
            {
                value: toNano('0.05'),
            },
            "increment"
        );

        expect(incrementResult.transactions).toHaveTransaction({
            from: caller.address,
            to: variables.address,
            success: true,
        });
    })

    it('should return the sum of the variables', async () => {
        const arg = 18n;
        const sum  = await variables.getSum(arg);
        // console.log("Sum: ", sum);
        expect(sum ).toEqual(1260200018n);
    })
});
