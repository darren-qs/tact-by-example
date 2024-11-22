import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { TrackableTrait } from '../wrappers/TrackableTrait';
import '@ton/test-utils';

describe('TrackableTrait', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let trackableTrait: SandboxContract<TrackableTrait>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        trackableTrait = blockchain.openContract(await TrackableTrait.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await trackableTrait.send(
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
            to: trackableTrait.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and trackableTrait are ready to use
    });
});
