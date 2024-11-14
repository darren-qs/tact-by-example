import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Integers } from '../wrappers/Integers';
import '@ton/test-utils';

describe('Integers', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let integers: SandboxContract<Integers>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        integers = blockchain.openContract(await Integers.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await integers.send(
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
            to: integers.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and integers are ready to use
    });

    it('should dump all the integer state to the console', async () => {
        const caller = await blockchain.treasury('caller');
        integers.send
        await integers.send(
            caller.getSender(),
            {
                value: toNano('0.05'),
            },
            "show all"
        );
    })
});
