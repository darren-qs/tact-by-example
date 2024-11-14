import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { IntegerOperations } from '../wrappers/IntegerOperations';
import '@ton/test-utils';

describe('IntegerOperations', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let integerOperations: SandboxContract<IntegerOperations>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        integerOperations = blockchain.openContract(await IntegerOperations.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await integerOperations.send(
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
            to: integerOperations.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and integerOperations are ready to use
    });

    it('should dump all the integer state to the console', async () => {
        const caller = await blockchain.treasury('caller');
        await integerOperations.send(
            caller.getSender(),
            {
                value: toNano('0.05'),
            },
            "show ops"
        );
    })
});
