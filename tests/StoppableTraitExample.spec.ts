import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { StoppableTraitExample } from '../wrappers/StoppableTraitExample';
import '@ton/test-utils';

describe('StoppableTraitExample', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let stoppableTraitExample: SandboxContract<StoppableTraitExample>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        stoppableTraitExample = blockchain.openContract(await StoppableTraitExample.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await stoppableTraitExample.send(
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
            to: stoppableTraitExample.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and stoppableTraitExample are ready to use
    });
});
