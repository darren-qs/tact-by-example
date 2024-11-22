import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Arrays } from '../wrappers/Arrays';
import '@ton/test-utils';

describe('Arrays', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let arrays: SandboxContract<Arrays>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        arrays = blockchain.openContract(await Arrays.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await arrays.send(
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
            to: arrays.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and arrays are ready to use
    });
});
