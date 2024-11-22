import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { ResumableTraitExample } from '../wrappers/ResumableTraitExample';
import '@ton/test-utils';

describe('ResumableTraitExample', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let resumableTraitExample: SandboxContract<ResumableTraitExample>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        resumableTraitExample = blockchain.openContract(await ResumableTraitExample.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await resumableTraitExample.send(
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
            to: resumableTraitExample.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and resumableTraitExample are ready to use
    });
});
