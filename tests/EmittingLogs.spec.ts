import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { EmittingLogs } from '../wrappers/EmittingLogs';
import '@ton/test-utils';

describe('EmittingLogs', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let emittingLogs: SandboxContract<EmittingLogs>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        emittingLogs = blockchain.openContract(await EmittingLogs.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await emittingLogs.send(
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
            to: emittingLogs.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and emittingLogs are ready to use
    });
});
